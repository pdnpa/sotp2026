<script>

import {data} from "../reportdata.data";
import DynamicComponent from "./DynamicComponent.vue";
import DynamicContentType from "./DynamicContentType.vue";
import WebMap from "./WebMap.vue";
import RiskScaleBadge from "./RiskScaleBadge.vue";
import LikelihoodBadge from "./LikelihoodBadge.vue";
import ReferenceList from "./ReferenceList.vue";
import GroupImpactAssessment from "./GroupImpactAssessment.vue";

const defaultGroup = {
  number: '0'
  ,title: ''
  ,introductions: []
  ,features: []
  ,distributions: []
  ,importances: []
  ,data_qualities: []
  ,impacts: []
  ,slug: ''
  ,url: ''
}

export default {
  name: "GroupPage",
  components: {DynamicContentType,DynamicComponent,WebMap,RiskScaleBadge,LikelihoodBadge,ReferenceList,GroupImpactAssessment},
  props: {
    group_id: {type: Number, required: true},
    family_id: {type: Number, required: true},
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
      pageHeaderFullWidth: false,
      group: data.families[this.family_id]?.['groups']?.[this.group_id] || { ...defaultGroup },
      family: data.families[this.family_id] || {},
      usedReferenceIds: []
    }
  },
  methods: {
    getLCALayerString(group) {
      return Object.values(group.landscape_character_areas).map(area => area.layer_slug).join(',');
    },
    getFirstImage(obj) {
      return obj.images ? Object.values(obj.images)[0] : null;
    },
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
    hasIntroductions() {
      return this.contentCollectionIsNotEmpty(this.group.introductions, 'introduction');
    },
    hasDistributions() {
      return this.contentCollectionIsNotEmpty(this.group.distributions, 'distribution');
    },
    hasImportances() {
      return this.contentCollectionIsNotEmpty(this.group.importances, 'importance');
    },
    hasBenefits() {
      return this.contentCollectionIsNotEmpty(this.group.benefits, 'benefit');
    },
    hasFeatures() {
      return this.contentCollectionIsNotEmpty(this.group.features, 'title');
    },
    hasImpacts() {
      return this.contentCollectionIsNotEmpty(this.group.impacts, 'impact');
    },
    hasDataQuality() {
      return this.contentCollectionIsNotEmpty(this.group.data_qualities, 'quality');
    }
  }
}
</script>

<template>
<div class="group-page" data-pagefind-body>
  <DocBefore>
    <div v-if="pageHeaderFullWidth" class="feature-family-heading feature-family-heading__descendant" :class="`bg-${family.slug}`">
      <a :href="$withBase(family.url)" class="back-to-family-link">{{family.title}}</a> <span class="breadcrumb-arrow"> &rarr; </span>
    </div>
    <div v-if="pageHeaderFullWidth" :id="`group_heading_${family.id}`"
         class="feature-group-heading">

      <h1>{{ group.title }}</h1>

    </div>

  </DocBefore>

  <div v-if="!pageHeaderFullWidth" class="feature-family-heading feature-family-heading-page-width feature-family-heading__descendant"
       :class="[`bg-${family.slug}`, { 'feature-family-heading-has-image': getFirstImage(family)?.url }]"
  >
    <div class="back-to-family-link__outer">
    <a :href="$withBase(family.url)" class="back-to-family-link">{{family.title}}</a>  <span class="vpi-chevron-right caret-icon"></span>
    </div>
    <div class="feature-family-heading__image-holder" v-if="getFirstImage(family)" :style="`background-image: url(`+getFirstImage(family).url+`)`"></div>
  </div>
  <div v-if="!pageHeaderFullWidth" :id="`group_heading_${family.id}`"
       class="feature-group-heading feature-group-heading-page-width">

    <h1>{{ group.title }}</h1>

  </div>

  <div id="introduction-block" class="group-section-block body-text pb-0" v-if="hasIntroductions"><h2 class="mb-0 mt-0" id="Introduction">Introduction</h2></div>
  <div class="group-section-block pt-0" v-if="hasIntroductions">
    <div class="group-data-elements">

      <DynamicContentType :chunks="group.introductions" contentFieldName="introduction" outerClass="group-data-element"/>

    </div>
  </div>

  <div id="distribution-block" class="group-section-block body-text pb-0" v-if="hasDistributions"><h2 class="mb-0 mt-0" id="Distribution">Distribution</h2></div>
  <div class="group-section-block pt-0 distribution-block" v-if="hasDistributions" :class="{'distribution-block-has-text': Object.keys(group.distributions || {}).length > 0, 'distribution-block-has-map': Object.keys(group.landscape_character_areas || {}).length > 0}">
    <div class="group-data-elements">

      <DynamicContentType :chunks="group.distributions" contentFieldName="distribution" outerClass="group-data-element"/>

    </div>

      <div v-if="Object.keys(group.landscape_character_areas || {}).length > 0">
        <div class="group-data-element">
          <h3>Landscape Character Areas</h3>
          <WebMap :layer="getLCALayerString(group)"></WebMap>
        </div>
      </div>


  </div>

  <div id="why-is-important-block" class="group-section-block body-text pb-0" v-if="hasImportances"><h2 class="mb-0 mt-0" id="Importance">Why is {{group.title}} important?</h2></div>
  <div class="group-section-block pt-0" v-if="hasImportances">
    <div class="group-data-elements">
      <DynamicContentType :chunks="group.importances" contentFieldName="importance" outerClass="group-data-element"/>

    </div>
  </div>




  <div class="feature-benefits" v-if="hasBenefits">
    <div class="first-col">
    <h3>Benefits provided by {{group.title}}</h3>
    </div>

    <div class="second-col">
      <ul class="benefit-list show-icon-text">
        <li v-for="benefit in group.benefits" :key="benefit.id">

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


  <div id="state-block" class="group-section-block body-text pb-0" v-if="hasFeatures"><h2 class="mb-0 mt-0" id="State">State of {{group.title}}</h2></div>
  <div class="group-section-block pt-0">
    <table>
      <thead>
      <tr>
        <th class="feature-title-column">Feature</th>
        <th>Key data</th>
        <th>Factors</th>
        <!-- <th>Benefits</th> -->
      </tr>
      </thead>
      <tbody>
      <tr v-for="feature in group.features" :key="feature.id">
        <td><a :href="$withBase(feature.url)">{{feature.title}}</a></td>
        <td>{{feature.key_data}}</td>
        <td>
          <ul class="factor-list">
            <li v-for="factor in feature.factors" :key="factor.id">

              <div v-if="getFirstImage(factor)">
                <a :href="$withBase(factor.url)">
                  <img
                      class="factor-image"
                      v-if="getFirstImage(factor)"
                      :src="getFirstImage(factor).url"
                      :alt="factor.title"
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
        </td>
        <!-- <td>
          -- benefits --
        </td> -->
      </tr>
      </tbody>
    </table>
  </div>

  <div id="impact-assessment-block" class="group-section-block body-text pb-0" v-if="hasImpacts"><h2 class="mb-0 mt-0" id="impact">Impact assessment</h2></div>
  <GroupImpactAssessment :group="group" v-if="hasImpacts"></GroupImpactAssessment>

  <div id="what-are-the-gaps-in-our-research-data" class="group-section-block body-text pb-0" v-if="hasDataQuality">
    <h2 class="mb-0 mt-0" id="Research">What are the gaps in our research & data?</h2>

      <DynamicContentType :content="group.data_qualities" content-field-name="quality" />

  </div>

  <ReferenceList :reference-ids="usedReferenceIds" />

</div>
</template>

<style lang="scss">
.vp-doc {
  .feature-title-column {
    width: 380px;
  }

  .feature-family-heading-page-width {
    position: relative;
    z-index: 1;
    padding-top: 2.5rem;
    .back-to-family-link {
      color: var(--pdnpa-lightbrown);
      font-size: var(--font-size-base);

      .caret-icon {
        display: inline-block;
      }
    }
  }
}
</style>