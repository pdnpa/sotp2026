<script>
//import reportdata, { features, references } from '../reportdata.js'
import { data } from '../reportdata.data.js'
import DynamicComponent from "./DynamicComponent.vue";
import FamilyRiskAssessment from "./FamilyRiskAssessment.vue";
import ReferenceList from "./ReferenceList.vue";


const defaultFamily = {
  number: '0'
  ,text: ''
  ,introductions: []
  ,families: []
  ,riskAssessments: []
}

export default {
  name: "FamilyPage",
  components: {DynamicComponent, FamilyRiskAssessment, ReferenceList},
  props: {
    family_id: {type: Number, required: true}
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
      family: data.families[this.family_id] || { ...defaultFamily },
      usedReferenceIds: []
    }
  },
}

</script>

<template>
<div class="family-page" data-pagefind-body>

  <DocBefore>
    <div :id="`objective_heading_${family.id}`"
         class="feature-family-heading">

      <h1>{{ family.title }}</h1>


    </div>

  </DocBefore>

  <div class="family-section-block body-text pb-0"><h2 class="mb-0 mt-0" id="introduction">Introduction</h2></div>
  <div class="family-section-block pt-0">
    <div class="family-data-elements">
      <div v-for="contentchunk in family.introductions" :key="contentchunk.id" class="family-data-element">
        <template v-if="contentchunk.content_type === 'rte'">
          <DynamicComponent :content="contentchunk.introduction" />
        </template>
        <template v-else-if="contentchunk.content_type === 'md'">
          <DynamicComponent :content="contentchunk.introduction" />
        </template>

      </div>
    </div>
  </div>

  <div class="family-section-block body-text pb-0"><h2 class="mb-0 mt-0" id="features">Features in this family</h2></div>
  <ul class="family-features-list">
    <li v-for="group in family.groups" :key="group.id" class="family-feature-group">
      <a :href="$withBase(group.url)">{{group.title}}</a>
      <ul>
        <li v-for="feature in group.features" :key="feature.id">
          <a :href="$withBase(feature.url)" :title="feature.key_data">{{feature.title}}</a>
        </li>
      </ul>
    </li>
  </ul>

  <div class="family-section-block body-text pb-0"><h2 class="mb-0 mt-0" id="risks">Risk to {{family.title}}</h2></div>
  <FamilyRiskAssessment :family="family"/>

  <ReferenceList :reference-ids="usedReferenceIds" />

</div>
</template>

<style scoped>

.family-features-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 1rem;
  margin: 4rem 0;

  padding: 0;
}
.family-feature-group {
  margin: 0 1rem 0 0;
  background-color: var(--pdnpa-lightblue);
  border-radius: 14px;
  padding: 1.4rem 1.6rem;
  color: #fff;

  ul {
    list-style: none;
    padding: 0;
    margin: 1.2rem 0 0 1.4rem;

    a {
      text-decoration: none;
      color: var(--pdnpa-lightbrown);
      &:hover, &:focus, &:focus-within {
        text-decoration: underline;
      }
    }

  }
}
.family-feature-group > a {
  display: block;
  font-size: 1.3rem;

  text-decoration: none;
  color: #fff;
  border-bottom: 1px solid #fff;
  padding-bottom: 8px;



  transition: background-color 0.2s ease;

  &:hover, &:focus, &:focus-within {
    //background-color: var(--pdnpa-midbrown);
    color: #323339;
  }
}
</style>