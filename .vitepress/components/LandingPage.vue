<script lang="ts">
import {defineComponent} from 'vue'
import FeatureAssessmentIndex from './FeatureAssessmentIndex.vue'


export default defineComponent({
  name: "LandingPage",
  components: {FeatureAssessmentIndex},
  mounted: () => {
    document.body.classList.add('landing-page')

    document.getElementsByClassName('logo')[0].src = '/pdnpa_logo_dark.png'
  },
  unmounted: () => {
    document.body.classList.remove('landing-page')
    document.getElementsByClassName('logo')[0].src = '/pdnpa_logo_white.png'
  }
})
</script>

<template>
<div class="outer landing-page-content">
  <div class="col">
    <h2>About the report</h2>
    <p>This report is a comprehensive account of the condition of the Peak District National Park. It presents the latest data and evidence to account for the wide variety of features that make the National Park a special place, and assesses what factors are driving change in the landscape.</p>

    <ul class="landing-btns">
      <li><a href="/introduction/introduction" class="landing-btn">Introduction</a></li>
      <li><a href="/introduction/methodology" class="landing-btn">Methodology</a></li>
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
  background-color: #fff;
  border-radius: var(--block-border-radius);
  padding: 0;

  h2 {
    margin-bottom: 1.5rem;
    margin-top: 0;
    padding-bottom: 1.4rem;
  }

  &:first-child {
    padding-right: 2rem;
  }
}

.landing-btns {
  list-style: none;
  padding: 0;
  margin: 2.5rem 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;

  li {
    padding: 0; margin: 0;
  }

  .landing-btn {
    background: var(--pdnpa-lightblue);
    display: block;
    color: #fff;
    border-radius: var(--block-border-radius);
    padding: 0.7rem 1.2rem;
    text-decoration: none;
    font-size: 20px;

    &:hover, &:focus, &:focus-within {
      background: var(--pdnpa-blue);
    }
  }
}
</style>