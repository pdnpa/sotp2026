<script>
export default {
  name: "ReferenceFootnote",
  props: {
    footnoteref: {type: String, required: true}
  },
  data() {
    return {
      footnote_id: 0
    }
  },
  beforeMount() {
    this.footnote_id = parseInt(this.footnoteref);
  },
}
</script>

<template>
<div class="footnote-reference" :id="`fnref-${footnote_id}`">[Footnote {{footnote_id}} here]</div>
</template>

<style scoped>

</style>