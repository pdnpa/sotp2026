export function contentCollectionIsNotEmpty(obj, content_field_name) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  return Object.values(obj).some(entry => {
    if (!entry || !content_field_name) return false;
    const content = entry[content_field_name];

    if (typeof content === 'string') {
      // Strip HTML tags and &nbsp; entities to ensure actual textual/image content exists
      const textContent = content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim();
      return textContent.length > 0;
    }

    return Boolean(content);
  });
}

export function getFirstImage(obj) {
  return obj && obj.images ? Object.values(obj.images)[0] : null;
}

export function getLCALayerString(group) {
  if (!group || !group.landscape_character_areas) {
    return '';
  }
  return Object.values(group.landscape_character_areas).map(area => area.layer_slug).join(',');
}

export function shouldShowBenefits() {
  return false;
}

export default {
  contentCollectionIsNotEmpty,
  getFirstImage,
  getLCALayerString,
  shouldShowBenefits
};
