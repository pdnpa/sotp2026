<template>
  <component :is="DynamicComponent" />
</template>

<script setup>
import { defineComponent, markRaw } from 'vue'
// If ReferenceFootnote isn't registered globally, import it here:
// import ReferenceFootnote from './ReferenceFootnote.vue'

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

// We use markRaw to optimize performance so Vue doesn't track
// the component definition itself as reactive data
const DynamicComponent = markRaw(
    defineComponent({
      // If you imported ReferenceFootnote above, register it here:
      // components: { ReferenceFootnote },
      template: `<div>${props.content}</div>`
    })
)
</script>