<script>
//import reportdata, { features, references } from '../reportdata.js'
import { data } from '../reportdata.data.js'
import DynamicContentType from "./DynamicContentType.vue";
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
  components: {DynamicContentType, FamilyRiskAssessment, ReferenceList},
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
      pageHeaderFullWidth: false,
      family: data.families[this.family_id] || { ...defaultFamily },
      usedReferenceIds: []
    }
  },
  methods: {
    getFirstImage(family) {
      return family.images ? Object.values(family.images)[0] : null;
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
      return this.contentCollectionIsNotEmpty(this.family.introductions, 'introduction');
    }
  }
}

</script>

<template>
<div class="family-page" data-pagefind-body>

  <DocBefore>
    <div :id="`objective_heading_${family.id}`"
         :class="[`bg-${family.slug}`, { 'feature-family-heading-has-image': getFirstImage(family)?.url }]"
         v-if="pageHeaderFullWidth"
         class="feature-family-heading">

      <h1 class="feature-family-heading__title">{{ family.title }}</h1>

      <div class="feature-family-heading__image-holder" v-if="getFirstImage(family)" :style="`background-image: url(`+getFirstImage(family).url+`)`"></div>

    </div>

  </DocBefore>

  <div :id="`objective_heading_${family.id}`"
       :class="[`bg-${family.slug}`, { 'feature-family-heading-has-image': getFirstImage(family)?.url }]"
       v-if="!pageHeaderFullWidth"
       class="feature-family-heading feature-family-heading-page-width">

    <div>
    <p class="feature-family-heading__subtitle">Feature assessments <span class="vpi-chevron-right caret-icon"></span></p>
    <h1 class="feature-family-heading__title">{{ family.title }}</h1>
    </div>
    <div class="feature-family-heading__image-holder" v-if="getFirstImage(family)" :style="`background-image: url(`+getFirstImage(family).url+`)`"></div>

  </div>

  <div class="family-section-block body-text pb-0" v-if="hasIntroductions"><h2 class="mb-0 mt-0" id="introduction">Introduction</h2></div>
  <div class="family-section-block pt-0" v-if="hasIntroductions">
    <div class="family-data-elements">

      <DynamicContentType :chunks="family.introductions" contentFieldName="introduction" outerClass="family-data-element"/>

    </div>
  </div>

  <div class="family-section-block body-text pb-0"><h2 class="mb-0 mt-0" id="features">Features in this family</h2></div>
  <ul class="family-features-list">
    <li v-for="group in family.groups" :key="group.id" class="family-feature-group" :class="`bg-${family.slug}`">
      <a :href="$withBase(group.url)">{{group.title}}</a>
      <ul>
        <li v-for="feature in group.features" :key="feature.id">
          <a :href="$withBase(feature.url)" :title="feature.key_data">{{feature.title}}</a>
        </li>
      </ul>
    </li>
  </ul>

  <div class="family-section-block body-text pb-0" v-if="family.riskAssessments && Object.keys(family.riskAssessments).length"><h2 class="mb-0 mt-0" id="risks">Risk to {{family.title}}</h2></div>
  <FamilyRiskAssessment :family="family" v-if="family.riskAssessments && Object.keys(family.riskAssessments).length" />

  <ReferenceList :reference-ids="usedReferenceIds" />

</div>
</template>

<style lang="scss">
.vp-doc {
  .feature-family-heading.feature-family-heading-has-image {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    justify-content: space-between;
  }

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
    border-radius: var(--block-border-radius);
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

  .feature-family-heading__image-holder {
    width: 45vw;
    height: 300px;
    position: relative;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

  }

  .feature-family-heading-page-width {
    border-radius: 0 0 14px 14px;
    margin-bottom: 2rem;
    .feature-family-heading__image-holder {
      width: 30vw;
      border-radius: 0 0 14px 0;
    }

    &.feature-family-heading__descendant {
      position: relative;
      z-index: 1;
      margin-bottom: calc(0px - var(--block-border-radius));

      .feature-family-heading__image-holder {
        height: 3rem;
      }
    }
  }

  .feature-family-heading__image {
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%);
  }

  .feature-family-heading__subtitle, .back-to-family-link__outer {
    color: var(--pdnpa-lightbrown);

    .caret-icon {
      color: var(--pdnpa-lightbrown);
      display: inline-block;
      vertical-align: middle;
      margin-top: -2px;

    }
  }
}
</style>