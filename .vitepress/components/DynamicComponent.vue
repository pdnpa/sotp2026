<template>
  <div v-if="isSSR" v-html="wrappedContent"></div>
  <component :is="comp" v-else />
</template>

<script setup>
import { defineComponent, markRaw, computed } from 'vue'

const props = defineProps({
  content: {
    type: String,
    required: true
  },
  classname: {
    type: String,
    required: false
  }
})

const isSSR = typeof window === 'undefined'

const wrappedContent = computed(() => {
  if (!props.content) return ''
  return props.content.trim().startsWith('<') ? props.content : `<p>${props.content}</p>`
})

const comp = computed(() => {
  if (isSSR) return null
  return markRaw(defineComponent({
    template: `<div class="${props.classname ?? ''}">${wrappedContent.value}</div>`
  }))
})
</script>