<script>
import { data } from '../reportdata.data.js'
import DynamicContentType from "./DynamicContentType.vue";
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
  components: {WebMap, ReferenceList, DynamicContentType},
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
    let feature = {};
    let group = {};
    let family = {};

    outerLoop: for (const familyId in data.families) {
      const f = data.families[familyId];
      for (const groupId in f.groups) {
        const g = f.groups[groupId];
        const features = Array.isArray(g.features) ? g.features : Object.values(g.features);
        const foundFeature = features.find(feat => feat.id === this.feature_id);
        if (foundFeature) {
          feature = foundFeature;
          group = g;
          family = f;
          break outerLoop;
        }
      }
    }

    return {
      feature,
      group,
      family,
      pageHeaderFullWidth: false,
      usedReferenceIds: []
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
<div class="factor-page" data-pagefind-body>
  <DocBefore>
    <div v-if="pageHeaderFullWidth" class="feature-family-heading feature-family-heading__descendant" :class="`bg-${family.slug}`">
      <a :href="$withBase(family.url)" class="back-to-family-link">{{family.title}}</a> <span class="breadcrumb-arrow"> &rarr; </span> <a :href="group.url" class="back-to-group-link">{{group.title}}</a> <span class="breadcrumb-arrow"> &rarr; </span>
    </div>
    <div :id="`objective_heading_${feature.id}`"
         v-if="pageHeaderFullWidth"
         class="feature-heading">

      <h1>{{ feature.title }}</h1>


    </div>

  </DocBefore>

  <div v-if="!pageHeaderFullWidth" class="feature-family-heading feature-family-heading-page-width feature-family-heading__descendant"
       :class="[`bg-${family.slug}`, { 'feature-family-heading-has-image': getFirstImage(family)?.url }]"
  >
    <div class="back-to-family-link__outer">
      <a :href="$withBase(family.url)" class="back-to-family-link">{{family.title}}</a>  <span class="vpi-chevron-right caret-icon"></span>  <a :href="group.url" class="back-to-group-link">{{group.title}}</a> <span class="vpi-chevron-right caret-icon"></span>
    </div>
    <div class="feature-family-heading__image-holder" v-if="getFirstImage(family)" :style="`background-image: url(`+getFirstImage(family).url+`)`"></div>
  </div>
  <div v-if="!pageHeaderFullWidth" :id="`feature_heading_${feature.id}`"
       class="feature-heading feature-heading-page-width">

    <h1>{{ feature.title }}</h1>

  </div>


  <div class="feature-benefits">

      <div class="first-col">
        <h2 id="Benefits">Benefits provided by {{feature.title}}</h2>
      </div>
      <div class="second-col">
        <ul class="benefit-list show-icon-text">
          <li v-for="benefit in feature.benefits" :key="benefit.id">

            <div v-if="getFirstImage(benefit)">
              <a :href="$withBase(benefit.url)">
                <img
                    class="benefit-image"
                    v-if="getFirstImage(benefit)"
                    :src="getFirstImage(benefit).url"
                    :alt="benefit.benefit"
                />
                <span class="icon-text">{{ benefit.benefit }}</span></a>
            </div>
            <div v-else>
              <a :href="$withBase(benefit.url)">
                <span class="image-placeholder"></span>
                <span class="icon-text">{{ benefit.benefit }}</span></a>
            </div>

          </li>
        </ul>
      </div>

  </div>

  <div class="feature-factors">
    <div class="first-col">
    <h2 id="ImpactFactors">Factors which impact {{feature.title}}</h2>
    </div>
    <div class="second-col">
      <ul class="factor-list show-icon-text">
        <li v-for="factor in feature.factors" :key="factor.id">

          <div v-if="getFirstImage(factor)">
            <a :href="$withBase(factor.url)">
            <img
                class="factor-image"
                v-if="getFirstImage(factor)"
                :src="getFirstImage(factor).url"
                :alt="factor.factor"
            />
            <span class="icon-text">{{ factor.title }}</span></a>
          </div>
          <div v-else>
            <a :href="$withBase(factor.url)">
            <span class="image-placeholder"></span>
            <span class="icon-text">{{ factor.title }}</span></a>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <div class="factor-section-block body-text pb-0"><h2 class="mb-0 mt-0" id="Description">Description</h2></div>
  <div class="factor-section-block pt-0">
    <div class="factor-data-elements">

      <DynamicContentType :chunks="feature.descriptions" contentFieldName="description" outerClass="factor-data-element"/>

    </div>
  </div>

  <div id="distribution" class="group-section-block body-text pb-0"><h2 class="mb-0 mt-0" id="Distribution">Distribution</h2></div>
  <div class="group-section-block pt-0 distribution-block" :class="{'distribution-block-has-text': Object.keys(feature.distributions || {}).length > 0, 'distribution-block-has-map': Object.keys(feature.landscape_character_areas || {}).length > 0}">
    <div class="group-data-elements">

      <DynamicContentType :chunks="feature.distributions" contentFieldName="distribution" outerClass="group-data-element"/>

    </div>
      <div v-if="Object.keys(feature.landscape_character_areas || {}).length > 0">
        <div class="group-data-element">
          <h3>Landscape Character Areas</h3>
          <WebMap :layer="getLCALayerString(feature)"></WebMap>
        </div>
      </div>


  </div>

  <div class="factor-section-block body-text pb-0"><h2 class="mb-0 mt-0" id="Condition">Condition</h2></div>
  <div class="factor-section-block pt-0">
    <div class="factor-data-elements">

      <DynamicContentType :chunks="feature.conditions" contentFieldName="condition" outerClass="factor-data-element"/>

    </div>
  </div>

  <ReferenceList :reference-ids="usedReferenceIds" />

</div>
</template>

<style lang="scss">


</style>