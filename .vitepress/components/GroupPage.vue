<script>

import {data} from "../reportdata.data";
import DynamicComponent from "./DynamicComponent.vue";
import WebMap from "./WebMap.vue";
import RiskScaleBadge from "./RiskScaleBadge.vue";

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
  components: {DynamicComponent,WebMap,RiskScaleBadge},
  props: {
    group_id: {type: Number, required: true},
    family_id: {type: Number, required: true},
  },
  data() {
    return {
      group: {},
      family: {},
    }
  },
  beforeMount() {
    this.group = data.families[this.family_id]['groups'][this.group_id] || { ...defaultGroup };
    this.family = data.families[this.family_id] || {};
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
<div class="group-page">
  <DocBefore>
    <div :id="`group_heading_${family.id}`"
         class="colourblock objective-section-block mt-2 headertext progress-objective-details">

      <h1>{{ group.title }}</h1>
      <p><a :href="family.url" class="back-to-family-link">{{family.title}}</a></p>


    </div>

  </DocBefore>

  <div id="introduction" class="group-section-block body-text pb-0"><h2 class="mb-0 mt-0">Introduction</h2></div>
  <div class="group-section-block pt-0">
    <div class="group-data-elements">
      <div v-for="contentchunk in group.introductions" :key="contentchunk.id" class="group-data-element">
        <template v-if="contentchunk.content_type === 'rte'">
          <div v-html="contentchunk.introduction"></div>
        </template>
        <template v-else-if="contentchunk.content_type === 'md'">
          <DynamicComponent :content="contentchunk.introduction" />
        </template>

      </div>
    </div>
  </div>

  <div id="distribution" class="group-section-block body-text pb-0"><h2 class="mb-0 mt-0">Distribution</h2></div>
  <div class="group-section-block pt-0">
    <div class="group-data-elements">
      <div v-for="contentchunk in group.distributions" :key="contentchunk.id" class="group-data-element">
        <template v-if="contentchunk.content_type === 'rte'">
          <div v-html="contentchunk.distribution"></div>
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

  <div id="why-is-important" class="group-section-block body-text pb-0"><h2 class="mb-0 mt-0">Why is {{group.title}} important?</h2></div>
  <div class="group-section-block pt-0">
    <div class="group-data-elements">
      <div v-for="contentchunk in group.importances" :key="contentchunk.id" class="group-data-element">
        <template v-if="contentchunk.content_type === 'rte'">
          <div v-html="contentchunk.importance"></div>
        </template>
        <template v-else-if="contentchunk.content_type === 'md'">
          <DynamicComponent :content="contentchunk.importance" />
        </template>

      </div>
    </div>
  </div>

  <ul>
    <li v-for="benefit in group.benefits" :key="benefit.id">

        <img
            class="benefit-image"
            v-if="getFirstImage(benefit)"
            :src="getFirstImage(benefit).url"
            :alt="benefit.title"
        >

        {{ benefit.title }}

    </li>
  </ul>

  <div id="state-of" class="group-section-block body-text pb-0"><h2 class="mb-0 mt-0">State of {{group.title}}</h2></div>
  <div class="group-section-block pt-0">
    <table>
      <thead>
      <tr>
        <th>Feature</th>
        <th>Key data</th>
        <th>Factors</th>
        <th>Benefits</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="feature in group.features" :key="feature.id">
        <td><a :href="feature.url">{{feature.title}}</a></td>
        <td>{{feature.key_data}}</td>
        <td>
          <ul>
            <li v-for="factor in feature.factors" :key="factor.id">
              <a :href="factor.url">
              <img
                  class="factor-image"
                v-if="getFirstImage(factor)"
                :src="getFirstImage(factor).url"
                :alt="factor.title"
              >

              {{ factor.title }}
              </a>
            </li>
          </ul>
        </td>
        <td>
          -- benefits --
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <div id="impact-assessment" class="group-section-block body-text pb-0"><h2 class="mb-0 mt-0">Impact assessment</h2></div>
  <div class="group-section-block pt-0">

    <table>
      <thead>
      <tr>
        <th>Feature</th>
        <th>Cause</th>
        <th>Factors</th>
        <th>Likelihood</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="impact in group.impacts" :key="impact.id">
        <td>{{impact.impact}}</td>
        <td>-- causes --</td>
        <td>
          <ul>
            <li v-for="factor in impact.factors" :key="factor.id">
              <a :href="factor.url">
                <img
                    class="factor-image"
                    v-if="getFirstImage(factor)"
                    :src="getFirstImage(factor).url"
                    :alt="factor.title"
                >

                {{ factor.title }}
              </a>
            </li>
          </ul>
        </td>
        <td>
          <RiskScaleBadge risktype="veryhigh">{{impact.likelihood}}</RiskScaleBadge>
        </td>
      </tr>
      </tbody>
    </table>

  </div>

  <div id="what-are-the-gaps-in-our-research-data" class="warning custom-block">
    <p class="custom-block-title">What are the gaps in our research & data?</p>
    <div v-for="contentchunk in group.data_qualities" :key="contentchunk.id" class="group-data-element">
      <template v-if="contentchunk.content_type === 'rte'">
        <div v-html="contentchunk.quality"></div>
      </template>
      <template v-else-if="contentchunk.content_type === 'md'">
        <DynamicComponent :content="contentchunk.quality" />
      </template>
    </div>
  </div>

</div>
</template>

<style scoped lang="scss">
.back-to-family-link {
  font-size: .8rem;
  text-decoration: none;
  color: var(--pdnpa-medium);
  display: block;
  padding-left: 1rem;
  &:hover {
    text-decoration: underline;
  }

  &:before {
    content: "← ";
    display: block;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: all .2s ease-in-out;
  }
  &:hover {
    &:before {
      left: -8px;
    }
  }
}
.factor-image, .benefit-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 1rem;
}
</style>