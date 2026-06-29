<script>
import { data } from '../reportdata.data.js'
import DynamicComponent from "./DynamicComponent.vue";
import WebMap from "./WebMap.vue";
import ReferenceList from "./ReferenceList.vue";

const defaultFeature = {
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
  name: "FeaturePage",
  components: {WebMap, DynamicComponent, ReferenceList},
  props: {
    feature_id: {type: Number, required: true}
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
      feature: {},
      group: {},
      family: {},
      usedReferenceIds: []
    }
  },
  beforeMount() {
    for (const familyId in data.families) {
      const family = data.families[familyId];
      for (const groupId in family.groups) {
        const group = family.groups[groupId];
        // Ensure group.features is handled correctly if it's an object or an array
        const features = Array.isArray(group.features) ? group.features : Object.values(group.features);
        const feature = features.find(f => f.id === this.feature_id);
        if (feature) {
          this.feature = feature;
          this.group = group;
          this.family = family;
          return;
        }
      }
    }
  },
  methods: {
    getLCALayerString(group) {
      return Object.values(group.landscape_character_areas).map(area => area.layer_slug).join(',');
    },
    getFirstImage(factor) {
      return factor.images ? Object.values(factor.images)[0] : null;
    }
  }
}

</script>

<template>
<div class="factor-page">
  <DocBefore>
    <div class="feature-family-heading feature-family-heading__descendant">
      <a :href="$withBase(family.url)" class="back-to-family-link">< {{family.title}}</a> <a :href="group.url" class="back-to-group-link">< {{group.title}}</a>
    </div>
    <div :id="`objective_heading_${feature.id}`"
         class="feature-heading">

      <h1>{{ feature.title }}</h1>


    </div>

  </DocBefore>




  <div class="feature-benefits">
    <h2 id="Benefits">Benefits provided by {{feature.title}}</h2>
    <div>
      <ul class="benefit-list">
        <li v-for="benefit in feature.benefits" :key="benefit.id">

          <div v-if="getFirstImage(benefit)">
            <a :href="$withBase(benefit.url)">
            <img
                class="benefit-image"
                v-if="getFirstImage(benefit)"
                :src="getFirstImage(benefit).url"
                :alt="benefit.benefit"
            />
            <span>{{ benefit.benefit }}</span></a>
          </div>
          <div v-else>
            <a :href="$withBase(benefit.url)">
            <span class="image-placeholder"></span>
            <span>{{ benefit.benefit }}</span></a>
          </div>

        </li>
      </ul>
    </div>
  </div>

  <div class="feature-factors">
    <h2 id="ImpactFactors">Factors which impact {{feature.title}}</h2>
    <div>
      <ul class="factor-list">
        <li v-for="factor in feature.factors" :key="factor.id">

          <div v-if="getFirstImage(factor)">
            <a :href="$withBase(factor.url)">
            <img
                class="factor-image"
                v-if="getFirstImage(factor)"
                :src="getFirstImage(factor).url"
                :alt="factor.factor"
            />
            <span>{{ factor.title }}</span></a>
          </div>
          <div v-else>
            <a :href="$withBase(factor.url)">
            <span class="image-placeholder"></span>
            <span>{{ factor.title }}</span></a>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <div class="factor-section-block body-text pb-0"><h2 class="mb-0 mt-0" id="Description">Description</h2></div>
  <div class="factor-section-block pt-0">
    <div class="factor-data-elements">
      <div v-for="contentchunk in feature.descriptions" :key="contentchunk.id" class="factor-data-element">
        <template v-if="contentchunk.content_type === 'rte'">
          <DynamicComponent :content="contentchunk.description" />
        </template>
        <template v-else-if="contentchunk.content_type === 'md'">
          <DynamicComponent :content="contentchunk.description" />
        </template>

      </div>
    </div>
  </div>

  <div id="distribution" class="group-section-block body-text pb-0"><h2 class="mb-0 mt-0" id="Distribution">Distribution</h2></div>
  <div class="group-section-block pt-0">
    <div class="group-data-elements">
      <div v-for="contentchunk in group.distributions" :key="contentchunk.id" class="group-data-element">
        <template v-if="contentchunk.content_type === 'rte'">
          <DynamicComponent :content="contentchunk.distribution" />
        </template>
        <template v-else-if="contentchunk.content_type === 'md'">
          <DynamicComponent :content="contentchunk.distribution" />
        </template>

      </div>

      <div v-if="group.landscape_character_areas">
        <div class="group-data-element">
          <h3>Landscape Character Areas</h3>
          <WebMap :layer="getLCALayerString(group)"></WebMap>
        </div>
      </div>

    </div>
  </div>

  <div class="factor-section-block body-text pb-0"><h2 class="mb-0 mt-0" id="Condition">Condition</h2></div>
  <div class="factor-section-block pt-0">
    <div class="factor-data-elements">
      <div v-for="contentchunk in feature.conditions" :key="contentchunk.id" class="factor-data-element">
        <template v-if="contentchunk.content_type === 'rte'">
          <DynamicComponent :content="contentchunk.condition" />
        </template>
        <template v-else-if="contentchunk.content_type === 'md'">
          <DynamicComponent :content="contentchunk.condition" />
        </template>

      </div>
    </div>
  </div>

  <ReferenceList :reference-ids="usedReferenceIds" />

</div>
</template>

<style scoped>

</style>