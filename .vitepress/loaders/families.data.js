import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { transformContentData } from '../utils/markdownTransformer.js'

export default {
  watch: ['../data/families.json'],
  async load() {
    const filePath = fileURLToPath(new URL('../data/families.json', import.meta.url))
    const rawFamilies = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    const families = await transformContentData(rawFamilies)

    // Lookup indices store IDs only. Loader output is serialised to JSON, so
    // storing object references here would duplicate whole families/groups
    // into every entry (this previously inflated the module to 40MB+).
    // Resolve parents client-side via data.families[familyId].groups[groupId].
    const features = {}
    const groups = {}

    for (const familyId in families) {
      const family = families[familyId]
      for (const groupId in family.groups || {}) {
        const group = family.groups[groupId]
        groups[groupId] = { familyId, groupId }
        const featList = Array.isArray(group.features) ? group.features : Object.values(group.features || {})
        featList.forEach((feat, featureIndex) => {
          features[feat.id] = { familyId, groupId, featureIndex }
        })
      }
    }

    // Lightweight, un-rendered summaries for index/landing listings
    // (description is displayed as plain text, so keep the raw value).
    const familySummaries = Object.values(rawFamilies).map(({ id, url, slug, title, description, images }) => ({
      id, url, slug, title, description, images
    }))

    return {
      families,
      groups,
      features,
      familySummaries
    }
  }
}
