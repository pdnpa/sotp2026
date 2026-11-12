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
  },
  computed: {
    // Sort chunks by their `order` property where set; chunks without an order
    // keep their natural position relative to each other and follow ordered ones.
    orderedChunks() {
      const toOrder = (value) => {
        if (value === null || value === undefined || value === '') return NaN
        return Number(value)
      }

      return Object.values(this.chunks ?? {})
        .map((chunk, index) => ({chunk, index, order: toOrder(chunk?.order)}))
        .sort((a, b) => {
          const hasOrderA = Number.isFinite(a.order)
          const hasOrderB = Number.isFinite(b.order)

          if (hasOrderA && hasOrderB) {
            return a.order - b.order || a.index - b.index
          }
          if (hasOrderA) return -1
          if (hasOrderB) return 1
          return a.index - b.index
        })
        .map(({chunk}) => chunk)
    }
  }
}

</script>

<template>
<div>
  <div v-for="contentchunk in orderedChunks" :key="contentchunk.id" :class="outerClass">
    <template v-if="contentchunk.content_type === 'rte'">
      <DynamicComponent :content="contentchunk[contentFieldName]" :classname="contentchunk.properties.cssclassnames ?? ''" />
    </template>
    <template v-else-if="contentchunk.content_type === 'md'">
      <DynamicComponent :content="contentchunk[contentFieldName]" :classname="contentchunk.properties.cssclassnames ?? ''" />
    </template>
    <template v-else-if="contentchunk.content_type === 'file'">
      <div class="content-image-container" :class="[{ 'content-image-container-right': contentchunk.properties.alignright === '1' ?? false },contentchunk.properties.cssclassnames ?? '']">
        <img :src="contentchunk[contentFieldName]" :alt="contentchunk.properties.caption ?? ''" class="content-image-image" />
        <span v-if="contentchunk.properties.caption" class="content-image-caption">{{ contentchunk.properties.caption ?? '' }}</span>
      </div>
    </template>

  </div>
</div>
</template>

<style scoped>

</style>