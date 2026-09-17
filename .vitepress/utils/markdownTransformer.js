let mdInstance = null

export async function getMarkdownRenderer() {
  if (!mdInstance) {
    const { createMarkdownRenderer } = await import('vitepress')
    const config = globalThis.VITEPRESS_CONFIG
    mdInstance = await createMarkdownRenderer(config)
  }
  return mdInstance
}

export function transformDataWithRenderer(data, md) {
  if (data === null || typeof data !== 'object') {
    return data
  }

  if (Array.isArray(data)) {
    return data.map(item => transformDataWithRenderer(item, md))
  }

  // Check if this object has content_type, suggesting it needs transformation
  if (data.content_type && data.content_type !== 'file') {
    const newData = { ...data }
    for (const key in newData) {
      if (
        typeof newData[key] === 'string' &&
        key !== 'content_type' &&
        key !== 'slug' &&
        key !== 'url' &&
        !key.endsWith('_id') &&
        key !== 'author' &&
        key !== 'title' &&
        key !== 'likelihood'
      ) {
        newData[key] = md.render(newData[key])
      }
    }
    return newData
  }

  // Otherwise, it's a regular object, recurse through its properties
  const newObj = {}
  for (const [key, value] of Object.entries(data)) {
    newObj[key] = transformDataWithRenderer(value, md)
  }
  return newObj
}

export async function transformContentData(data) {
  const md = await getMarkdownRenderer()
  return transformDataWithRenderer(data, md)
}
