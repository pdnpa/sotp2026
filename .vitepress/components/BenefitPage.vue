<script>
import { data } from '../reportdata.data.js'
import DynamicContentType from "./DynamicContentType.vue";
import ReferenceList from "./ReferenceList.vue";
import DynamicComponent from "./DynamicComponent.vue";
import { contentCollectionIsNotEmpty } from '../utils.js'

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
  components: {DynamicContentType, ReferenceList, DynamicComponent},
  props: {
    benefit_id: {type: Number, required: true}
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
  data() {
    return {
      benefit: (data.benefits && data.benefits[this.benefit_id]) || { ...defaultBenefit },
      usedReferenceIds: []
    }
  },
  methods: {
    contentCollectionIsNotEmpty
  },
  computed: {
    hasDescriptions() {
      return this.contentCollectionIsNotEmpty(this.benefit.descriptions, 'description');
    },
    hasImpacts() {
      return this.benefit.impacts && Object.keys(this.benefit.impacts).length > 0;
    }

  }
}

</script>

<template>
<div class="factor-page" data-pagefind-body>
  <DocBefore>
    <div :id="`objective_heading_${benefit.id}`"
         class="feature-family-heading">

      <h1>{{ benefit.title }}</h1>
    </div>
  </DocBefore>

  <div class="factor-section-block body-text pb-0" v-if="hasDescriptions"><h2 class="mb-0 mt-0" id="Description">Description</h2></div>
  <div class="factor-section-block pt-0" v-if="hasDescriptions">
    <div class="factor-data-elements">

      <DynamicContentType :chunks="benefit.descriptions" contentFieldName="description" outerClass="benefit-data-element"/>

    </div>
  </div>


  <div class="factor-section-block body-text pb-0" v-if="hasImpacts"><h2 class="mb-0 mt-0" id="impacts">Impacts resulting from {{benefit.title}}</h2></div>
  <div class="factor-section-block pt-0" v-if="hasImpacts">
    <div class="factor-data-elements">
      <div v-for="impact in benefit.impacts" :key="impact.id" class="factor-data-element">
        <h3>{{impact.title}}</h3>

        <DynamicComponent :content="impact.benefit_impact_description" />
      </div>
    </div>
  </div>

  <ReferenceList :reference-ids="usedReferenceIds" />

</div>
</template>

<style scoped>

</style>