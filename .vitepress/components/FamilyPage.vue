<script>
//import reportdata, { features, references } from '../reportdata.js'
import { data } from '../reportdata.data.js'
import DynamicComponent from "./DynamicComponent.vue";
import FamilyRiskAssessment from "./FamilyRiskAssessment.vue";


const defaultFamily = {
  number: '0'
  ,text: ''
  ,introductions: []
  ,families: []
  ,riskAssessments: []
}

export default {
  name: "FamilyPage",
  components: {DynamicComponent, FamilyRiskAssessment},
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

  <DocBefore>
    <div :id="`objective_heading_${family.id}`"
         class="colourblock objective-section-block mt-2 headertext progress-objective-details">

      <h1>{{ family.title }}</h1>


    </div>

  </DocBefore>

  <div class="family-section-block body-text pb-0"><h2 class="mb-0 mt-0" id="introduction">Introduction</h2></div>
  <div class="family-section-block pt-0">
    <div class="family-data-elements">
      <div v-for="contentchunk in family.introductions" :key="contentchunk.id" class="family-data-element">
        <template v-if="contentchunk.content_type === 'rte'">
          <div v-html="contentchunk.introduction"></div>
        </template>
        <template v-else-if="contentchunk.content_type === 'md'">
          <DynamicComponent :content="contentchunk.introduction" />
        </template>

      </div>
    </div>
  </div>

  <div class="family-section-block body-text pb-0"><h2 class="mb-0 mt-0" id="features">Features in this family</h2></div>
  <ul class="family-features-list">
    <li v-for="group in family.groups" :key="group.id">
      <a :href="group.url">{{group.title}}</a>
      <ul>
        <li v-for="feature in group.features" :key="feature.id">
          <a :href="feature.url" :title="feature.key_data">{{feature.title}}</a>
        </li>
      </ul>
    </li>
  </ul>

  <div class="family-section-block body-text pb-0"><h2 class="mb-0 mt-0" id="risks">Risk to {{family.title}}</h2></div>
  <FamilyRiskAssessment :family="family"/>

</div>
</template>

<style scoped>

</style>