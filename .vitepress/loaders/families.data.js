import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { transformContentData } from '../utils/markdownTransformer.js'

export default {
  watch: ['../data/families.json'],
  async load() {
    const filePath = fileURLToPath(new URL('../data/families.json', import.meta.url))
    const rawFamilies = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    const families = await transformContentData(rawFamilies)

    // Build fast lookup indices for groups and features with parent relationships
    const features = {}
    const groups = {}

    for (const familyId in families) {
      const family = families[familyId]
      for (const groupId in family.groups || {}) {
        const group = family.groups[groupId]
        groups[groupId] = {
          group,
          family
        }
        const featList = Array.isArray(group.features) ? group.features : Object.values(group.features || {})
        for (const feat of featList) {
          features[feat.id] = {
            feature: feat,
            group,
            family
          }
        }
      }
    }

    return {
      families,
      groups,
      features,
      rawFamilies
    }
  }
}
