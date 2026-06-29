<script>
import { data } from '../reportdata.data.js'
import DynamicComponent from "./DynamicComponent.vue";

const defaultBenefit = {
  number: '0'
  ,id: '0'
  ,title: ''
  ,primary_color: ''
  ,secondary_color: ''
  ,descriptions: []
  ,impacts: []
  ,attachments: []
}

export default {
  name: "BenefitPage",
  components: {DynamicComponent},
  props: {
    factor_id: {type: Number, required: true}
  },
  data() {
    return {
      benefit: {}
    }
  },
  beforeMount() {
    this.benefit = data.benefits[this.benefit_id] || { ...defaultBenefit };
  },
}

</script>

<template>
<div class="factor-page">
  <DocBefore>
    <div :id="`objective_heading_${benefit.id}`"
         class="feature-family-heading">

      <h1>{{ benefit.title }}</h1>
    </div>
  </DocBefore>

  <div class="factor-section-block body-text pb-0"><h2 class="mb-0 mt-0" id="Description">Description</h2></div>
  <div class="factor-section-block pt-0">
    <div class="factor-data-elements">
      <div v-for="contentchunk in factor.descriptions" :key="contentchunk.id" class="factor-data-element">
        <template v-if="contentchunk.content_type === 'rte'">
          <DynamicComponent :content="contentchunk.description" />
        </template>
        <template v-else-if="contentchunk.content_type === 'md'">
          <DynamicComponent :content="contentchunk.description" />
        </template>

      </div>
    </div>
  </div>


  <div class="factor-section-block body-text pb-0"><h2 class="mb-0 mt-0" id="impacts">Impacts resulting from {{factor.title}}</h2></div>
  <div class="factor-section-block pt-0">
    <div class="factor-data-elements">
      <div v-for="impact in factor.impacts" :key="impact.id" class="factor-data-element">
        <h3>{{impact.title}}</h3>

        <DynamicComponent :content="impact.factor_impact_description" />
      </div>
    </div>
  </div>




</div>
</template>

<style scoped>

</style>