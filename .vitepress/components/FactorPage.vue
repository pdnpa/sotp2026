<script>
import { data } from '../reportdata.data.js'
import DynamicComponent from "./DynamicComponent.vue";
import DynamicContentType from "./DynamicContentType.vue";
import ReferenceList from "./ReferenceList.vue";
import { contentCollectionIsNotEmpty, getFirstImage } from '../utils.js'

const defaultFactor = {
  number: '0'
  ,id: '0'
  ,title: ''
  ,url: '#'
  ,slug: ''
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
  data() {
    return {
      factor: data.factors[this.factor_id] || { ...defaultFactor },
      pageHeaderFullWidth: false,
      usedReferenceIds: []
    }
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
  methods: {
    contentCollectionIsNotEmpty,
    getFirstImage
  },
  computed: {
    hasDescriptions() {
      return this.contentCollectionIsNotEmpty(this.factor.descriptions, 'description');
    },
    hasImpacts() {
      return this.factor.impacts && Object.keys(this.factor.impacts).length > 0;
    },
    hasFeatures() {
      return this.contentCollectionIsNotEmpty(this.factor.features, 'title');
    }
  }
}

</script>

<template>
<div class="factor-page" data-pagefind-body>
  <DocBefore>
    <div v-if="pageHeaderFullWidth && factor.url" class="feature-family-heading feature-family-heading__descendant" :class="`bg-${factor.slug}`">
      <a :href="factor.url ? $withBase(factor.url) : '#'" class="back-to-family-link">{{factor.title}}</a> <span class="breadcrumb-arrow"> &rarr; </span>
    </div>

  </DocBefore>

  <div v-if="!pageHeaderFullWidth" :id="`group_heading_${factor.id}`"
       class="factor-group-heading factor-group-heading-page-width" :class="`bg-${factor.slug}`">

    <div>
    <p class="back-to-factors-link__outer"><a href="/factors.html" class="back-to-family-link back-to-factors-link">Factors</a> <span class="vpi-chevron-right caret-icon"></span></p>
    <h1>{{ factor.title }}</h1>
    </div>
    <div class="factor-heading__image-holder" v-if="getFirstImage(factor)" :style="`background-image: url(`+getFirstImage(factor).url+`)`">

    </div>

  </div>


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

  <div class="factor-section-block body-text pb-0" v-if="hasFeatures"><h2 class="mb-0 mt-0" id="impacts">Features linked to {{factor.title}}</h2></div>
  <div class="factor-section-block pt-0" v-if="hasFeatures">
    <div class="factor-data-elements">
        <ul>
          <li v-for="feature in factor.features" :key="feature.id">
            <a :href="feature.url ? $withBase(feature.url) : '#'" :title="feature.key_data">{{feature.title}}</a>
          </li>
        </ul>
    </div>
  </div>

  <ReferenceList :reference-ids="usedReferenceIds" />

</div>
</template>

<style scoped lang="scss">
.vp-doc {

  .back-to-factors-link {
    color: #fff;
    font-size: var(--font-size-base);

  }
  .back-to-factors-link__outer {
    margin-bottom: 8px;
    .caret-icon {
      color: var(--pdnpa-lightgrey);
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
        color: var(--pdnpa-lightgrey);
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

@media screen and (min-width: 768px) {

}

</style>