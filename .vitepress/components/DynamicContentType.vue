<script>

import DynamicComponent from "./DynamicComponent.vue";

export default {
  name: 'DynamicContentType',
  components: {DynamicComponent},
  props: {
    chunks: Object,
    contentFieldName: {
      type: String,
      default: 'introduction'
    },
    outerClass: {
      type: String,
      default: 'variable-data-element'
    }
  },
  data() {
    return {
      contentType: 'text'
    }
  }
}

</script>

<template>
<div>
  <div v-for="contentchunk in chunks" :key="contentchunk.id" :class="outerClass">
    <template v-if="contentchunk.content_type === 'rte'">
      <DynamicComponent :content="contentchunk[contentFieldName]" />
    </template>
    <template v-else-if="contentchunk.content_type === 'md'">
      <DynamicComponent :content="contentchunk[contentFieldName]" />
    </template>
    <template v-else-if="contentchunk.content_type === 'file'">
      <div class="content-image-container" :class="{ 'content-image-container-right': contentchunk.properties.alignright ?? false }">
        <img :src="contentchunk[contentFieldName]" :alt="contentchunk.properties.caption ?? ''" class="content-image-image" />
        <span v-if="contentchunk.properties.caption" class="content-image-caption">{{ contentchunk.properties.caption ?? '' }}</span>
      </div>
    </template>

  </div>
</div>
</template>

<style scoped>

</style>