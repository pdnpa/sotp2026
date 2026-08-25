<script>
import { data } from '../reportdata.data.js'
import DynamicContentType from "./DynamicContentType.vue";
import ReferenceList from "./ReferenceList.vue";
import DynamicComponent from "./DynamicComponent.vue";
import { contentCollectionIsNotEmpty, getFirstImage } from '../utils.js'

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
    contentCollectionIsNotEmpty,
    getFirstImage
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
    <div v-if="pageHeaderFullWidth" class="feature-family-heading feature-family-heading__descendant" :class="`bg-${benefit.slug}`">
      <a :href="$withBase(benefit.url)" class="back-to-family-link">{{benefit.title}}</a> <span class="breadcrumb-arrow"> &rarr; </span>
    </div>

  </DocBefore>

  <div v-if="!pageHeaderFullWidth" :id="`group_heading_${benefit.id}`"
       class="factor-group-heading factor-group-heading-page-width" :class="`bg-${benefit.slug}`">

    <div>
      <p class="back-to-factors-link__outer"><a href="/benefits.html" class="back-to-family-link back-to-factors-link">Benefits</a> <span class="vpi-chevron-right caret-icon"></span></p>
      <h1>{{ benefit.title }}</h1>
    </div>
    <div class="factor-heading__image-holder" v-if="getFirstImage(benefit)" :style="`background-image: url(`+getFirstImage(benefit).url+`)`">

    </div>

  </div>

  <div class="notice">

  <p>Full details to follow</p>

  </div>

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

<style scoped lang="scss">

.notice {
  padding-left: 1rem;
}

.vp-doc {

  .back-to-factors-link {
    color: var(--pdnpa-darkbrown);
    font-size: var(--font-size-base);

  }
  .back-to-factors-link__outer {
    margin-bottom: 8px;
    .caret-icon {
      color: var(--pdnpa-darkbrown);
      display: inline-block;
      vertical-align: middle;
      margin-top: -2px;
    }
  }

  .factor-title-column {
    width: 380px;
  }

  .factor-family-heading-page-width {
    /*background-color: var(--pdnpa-midbrown-lightforeground);*/
  }

  .factor-family-heading-page-width {
    position: relative;
    z-index: 1;
    color: #fff;

    .back-to-family-link {
      color: #fff;
      font-size: var(--font-size-base);


    }


    .back-to-family-link__outer {
      .caret-icon {

        color: var(--pdnpa-darkbrown);
        display: inline-block;
      }
    }

  }

  .factor-group-heading.factor-group-heading-page-width {
    padding-top: 2.5rem;
    padding-bottom: 1.5rem;
  }

  .back-to-family-link__outer .caret-icon {
    color: var(--pdnpa-darkbrown);
  }

  .factor-group-heading-page-width {
    display: flex;
    align-items: center;
    justify-content: space-between;

    /*background-color: var(--pdnpa-midbrown);*/
  }
  .factor-family-heading {
    padding-top: 1rem;
  }

  .factor-heading__image-holder {
    width: 180px;
    height: 180px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
}
</style>