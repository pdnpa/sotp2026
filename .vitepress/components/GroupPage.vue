<script>

import {data} from "../reportdata.data";
import DynamicComponent from "./DynamicComponent.vue";

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
  components: {DynamicComponent},
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
}
</script>

<template>
<div class="group-page">
  <DocBefore>
    <div :id="`group_heading_${family.id}`"
         class="colourblock objective-section-block mt-2 headertext progress-objective-details">

      <h1>{{ group.title }}</h1>
      <p>< {{family.title}}</p>


    </div>

  </DocBefore>

  <div class="group-section-block body-text pb-0"><h2 class="mb-0 mt-0">Introduction</h2></div>
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
    <hr/>
  </div>

  <div class="group-section-block body-text pb-0"><h2 class="mb-0 mt-0">Distribution</h2></div>
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
    </div>
    <hr/>
  </div>

  <div class="group-section-block body-text pb-0"><h2 class="mb-0 mt-0">Why is {{group.title}} important?</h2></div>
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
    <hr/>
  </div>

  <h3>@todo List benefits based on feature pages</h3>

  <div class="group-section-block body-text pb-0"><h2 class="mb-0 mt-0">State of {{group.title}}</h2></div>
  <div class="group-section-block pt-0">
    <p>@todo generate table from features</p>
    <hr/>
  </div>

  <div class="group-section-block body-text pb-0"><h2 class="mb-0 mt-0">Impact assessment</h2></div>
  <div class="group-section-block pt-0">
    <p>@todo generate table from features</p>
    <hr/>
  </div>

  ::: warning
  <div v-for="contentchunk in group.data_qualities" :key="contentchunk.id" class="group-data-element">
    <template v-if="contentchunk.content_type === 'rte'">
      <div v-html="contentchunk.quality"></div>
    </template>
    <template v-else-if="contentchunk.content_type === 'md'">
      <DynamicComponent :content="contentchunk.quality" />
    </template>
  </div>
  :::
  
</div>
</template>

<style scoped>

</style>