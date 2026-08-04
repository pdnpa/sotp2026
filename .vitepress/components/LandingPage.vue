<script lang="ts">
import {defineComponent} from 'vue'
import FeatureAssessmentIndex from './FeatureAssessmentIndex.vue'

export default defineComponent({
  name: "LandingPage",
  components: {FeatureAssessmentIndex}
})
</script>

<template>
<div class="outer">
  <div class="col">
    <h2>About the State of the Park Report</h2>
    <p>This report is a comprehensive account of the condition of the Peak District National Park. It presents the latest data and evidence to account for the wide variety of features that make the National Park a special place, and assesses what factors are driving change in the landscape.</p>
    <h3>Learn more</h3>
    <ul>
      <li><a href="/introduction/introduction">Introduction</a></li>
      <li><a href="/introduction/methodology">Methodology</a></li>
    </ul>
  </div>
  <div class="col">
    <h2>Explore the State of the Park</h2>
    <p>Dive in to find out more about the features of the National Park, or explore the factors which are driving change.</p>
    <FeatureAssessmentIndex />
  </div>
</div>
</template>

<style lang="scss" scoped>
.outer {
  display: flex;
  gap: 2rem;

  --assessment-item-width: 170px;

  .feature-assessments {
    //grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  }
}
.col {
  background-color: var(--vp-c-bg-soft);
  border-radius: var(--block-border-radius);
  padding: 1rem;

  h2 {
    margin-bottom: 1rem;
    margin-top: 0;
    padding-bottom: 2rem;
  }
}
</style>