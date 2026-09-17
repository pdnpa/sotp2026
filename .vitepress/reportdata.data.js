import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { transformContentData } from './utils/markdownTransformer.js'

/**
 * Backwards-compatible data loader that loads from structured JSON files in .vitepress/data/
 */
export default {
  watch: ['./data/**/*.json'],
  async load() {
    const readJson = (file) => JSON.parse(fs.readFileSync(fileURLToPath(new URL(`./data/${file}`, import.meta.url)), 'utf8'))

    const reportdata = readJson('families.json')
    const factors = readJson('factors.json')
    const benefits = readJson('benefits.json')
    const pages = readJson('pages.json')
    const references = readJson('references.json')
    const risk_levels = [1, 2, 3, 4]
    const likelihoods = [1, 2, 3, 4]

    // Build features dictionary from families for legacy compatibility
    const rawFeatures = {}
    for (const fam of Object.values(reportdata)) {
      for (const grp of Object.values(fam.groups || {})) {
        const feats = Array.isArray(grp.features) ? grp.features : Object.values(grp.features || {})
        for (const f of feats) {
          rawFeatures[f.id] = f
        }
      }
    }

    const compiledFamilies = await transformContentData(reportdata)
    const compiledFactors = await transformContentData(factors)
    const compiledBenefits = await transformContentData(benefits)
    const compiledPages = await transformContentData(pages)
    const compiledFeatures = await transformContentData(rawFeatures)

    return {
      reportdata,
      features: compiledFeatures,
      references,
      families: compiledFamilies,
      factors: compiledFactors,
      benefits: compiledBenefits,
      pages: compiledPages,
      risk_levels,
      likelihoods,
    }
  }
}
