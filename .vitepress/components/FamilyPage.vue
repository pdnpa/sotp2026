<script>
//import reportdata, { features, references } from '../reportdata.js'
import { data } from '../reportdata.data.js'
import DynamicComponent from "./DynamicComponent.vue";


const defaultFamily = {
  number: '0'
  ,text: ''
  ,introductions: []
  ,families: []
}

export default {
  name: "FamilyPage",
  components: {DynamicComponent},
  props: {
    family_id: {type: Number, required: true}
  },
  data() {
    return {
      family: {}
    }
  },
  beforeMount() {
    this.family = data.families[this.family_id] || { ...defaultFamily };
  },
}

</script>

<template>
<div class="family-page">
  This is a family page
  <div class="objective-section-block body-text pb-0"><h4 class="mb-0 mt-0">Introduction</h4></div>
  <div class="objective-section-block pt-0">
    <div class="objective-data-elements">
      <div v-for="contentchunk in family.introductions" :key="contentchunk.id" class="objective-data-element">
        <template v-if="contentchunk.content_type === 'rte'">
          <div v-html="contentchunk.introduction"></div>
        </template>
        <template v-else-if="contentchunk.content_type === 'md'">
          <DynamicComponent :content="contentchunk.introduction" />
        </template>

      </div>
    </div>
    <hr/>
  </div>
</div>
</template>

<style scoped>

</style>