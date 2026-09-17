import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

export default {
  watch: ['../data/references.json'],
  async load() {
    const filePath = fileURLToPath(new URL('../data/references.json', import.meta.url))
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  }
}
