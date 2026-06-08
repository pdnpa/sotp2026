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