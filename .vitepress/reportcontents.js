import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const navPath = fileURLToPath(new URL('./data/navigation.json', import.meta.url))
const navigation = JSON.parse(fs.readFileSync(navPath, 'utf8'))

export const contentsFeatures = navigation.contentsFeatures
export const contentsFactors = navigation.contentsFactors

export default {
  contentsFeatures,
  contentsFactors,
}
