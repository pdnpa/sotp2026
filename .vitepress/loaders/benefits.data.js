import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { transformContentData } from '../utils/markdownTransformer.js'

export default {
  watch: ['../data/benefits.json'],
  async load() {
    const filePath = fileURLToPath(new URL('../data/benefits.json', import.meta.url))
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    return await transformContentData(raw)
  }
}
