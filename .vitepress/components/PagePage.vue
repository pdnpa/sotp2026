<script lang="ts">
import {defineComponent} from 'vue'
import { data } from '../reportdata.data.js'
import DynamicComponent from "./DynamicComponent.vue";
import DynamicContentType from "./DynamicContentType.vue";
import ReferenceList from "./ReferenceList.vue";
import { contentCollectionIsNotEmpty, getFirstImage } from '../utils.js'

const defaultPage = {
  title: "Default Page",
  contents: [{type: "rte", content: "<p>This is a default page.</p>"}]
}
export default defineComponent({
  name: "PagePage", // :)
  components: {DynamicComponent, ReferenceList, DynamicContentType},
  props: {
    page_id: {type: Number, required: true}
  },
  data() {
    return {
      page: data.pages[this.page_id] || { ...defaultPage },
      usedReferenceIds: []
    }
  },
  methods: {
    contentCollectionIsNotEmpty
  },
  provide() {
    return {
      registerReference: (id) => {
        if (!this.usedReferenceIds.includes(id)) {
          this.usedReferenceIds.push(id);
        }
      }
    }
  },
  computed: {
    hasContents() {
      return this.contentCollectionIsNotEmpty(this.page.contents, 'content');
    },
  }
})
</script>

<template>
<div>

  <h1>{{page.title}}</h1>


  <div class="factor-section-block pt-0" v-if="hasContents">
    <div class="factor-data-elements">

      <DynamicContentType :chunks="page.contents" contentFieldName="content"/>

    </div>
  </div>

  <ReferenceList :reference-ids="usedReferenceIds" />

</div>
</template>

<style scoped lang="scss">

</style>