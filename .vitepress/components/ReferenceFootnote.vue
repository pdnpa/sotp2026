<script>
export default {
  name: "ReferenceFootnote",
  inject: {
    registerReference: {
      from: 'registerReference',
      default: null
    }
  },
  props: {
    footnoteref: {type: String, required: true}
  },
  data() {
    return {
      footnote_id: 0
    }
  },
  created() {
    this.footnote_id = parseInt(this.footnoteref);
    if (this.registerReference) {
      this.registerReference(this.footnote_id);
    }
  },
}
</script>

<template>
  <a :href="`#footnote_${footnote_id}`" class="footnote-reference" title="Go to footnote reference detail below"><small :id="`fnref-${footnote_id}`"><sup>[{{footnote_id}}]</sup></small></a>
</template>

<style scoped lang="scss">
.footnote-reference {
  font-size: 0.8rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
</style>