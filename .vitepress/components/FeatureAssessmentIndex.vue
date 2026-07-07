<script>
import { data } from '../reportdata.data.js'

export default {
  name: "FeatureAssessmentIndex",
  data() {
    return {
      families: []
    }
  },
  beforeMount() {
    this.families = Object.values(data.reportdata);
  },
}
</script>
<template>
<div class="feature-assessment-index">

  <DocBefore>

  </DocBefore>
  <div class="feature-assessments">
    <div v-for="family in families" :key="family.id" class="feature-assessment-entry">
      <a :href="$withBase(family.url)" class="feature-assessment-link">{{family.title}}</a>
    </div>
  </div>
</div>
</template>
<style scoped>
.feature-assessments {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1rem;
  margin-top: 2rem;
}
.feature-assessment-entry {
}
.feature-assessment-link {
  display: block;
  font-size: 1.2rem;
  padding: 1rem;
  text-decoration: none;
  background-color: var(--pdnpa-lightbrown);
  color: var(--pdnpa-darkbrown);

  border-radius: 14px;
  transition: background-color 0.3s ease;

  &:hover, &:focus, &:focus-within {
    background-color: var(--pdnpa-midbrown);
  }
}
</style>