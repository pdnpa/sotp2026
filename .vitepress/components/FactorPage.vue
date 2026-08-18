<script>
import { data } from '../reportdata.data.js'
import DynamicComponent from "./DynamicComponent.vue";
import DynamicContentType from "./DynamicContentType.vue";
import ReferenceList from "./ReferenceList.vue";

const defaultFactor = {
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
  name: "FactorPage",
  components: {DynamicComponent, ReferenceList, DynamicContentType},
  props: {
    factor_id: {type: Number, required: true}
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
      factor: data.factors[this.factor_id] || { ...defaultFactor },
      usedReferenceIds: []
    }
  },
  methods: {
    contentCollectionIsNotEmpty(obj, content_field_name) {
      if (!obj || typeof obj !== 'object') {
        return false;
      }

      return Object.values(obj).some(entry => {
        if (!entry || !content_field_name) return false;
        const content = entry[content_field_name];

        if (typeof content === 'string') {
          // Strip HTML tags and &nbsp; entities to ensure actual textual/image content exists
          const textContent = content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim();
          return textContent.length > 0;
        }

        return Boolean(content);
      });
    }
  },
  computed: {
    hasDescriptions() {
      return this.contentCollectionIsNotEmpty(this.factor.descriptions, 'description');
    },
    hasImpacts() {
      return this.factor.impacts && Object.keys(this.factor.impacts).length > 0;
    }

  }
}

</script>

<template>
<div class="factor-page" data-pagefind-body>
  <DocBefore>
    <div :id="`objective_heading_${factor.id}`"
         class="feature-family-heading">

      <h1>{{ factor.title }}</h1>


    </div>

  </DocBefore>

  <div class="factor-section-block body-text pb-0" v-if="hasDescriptions"><h2 class="mb-0 mt-0" id="Description">Description</h2></div>
  <div class="factor-section-block pt-0" v-if="hasDescriptions">
    <div class="factor-data-elements">

      <DynamicContentType :chunks="factor.descriptions" contentFieldName="description"/>

    </div>
  </div>


  <div class="factor-section-block body-text pb-0" v-if="hasImpacts"><h2 class="mb-0 mt-0" id="impacts">Impacts resulting from {{factor.title}}</h2></div>
  <div class="factor-section-block pt-0" v-if="hasImpacts">
    <div class="factor-data-elements">
      <div v-for="impact in factor.impacts" :key="impact.id" class="factor-data-element">
        <h3>{{impact.title}}</h3>

        <DynamicComponent :content="impact.factor_impact_description" />
      </div>
    </div>
  </div>

  <ReferenceList :reference-ids="usedReferenceIds" />

</div>
</template>

<style scoped>

</style>