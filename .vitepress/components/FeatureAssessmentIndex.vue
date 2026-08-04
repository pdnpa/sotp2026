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
  methods: {
    getFirstImage(family) {
      return family.images ? Object.values(family.images)[0] : null;
    }
  }
}
</script>
<template>
<div class="feature-assessment-index">

  <DocBefore>

  </DocBefore>
  <div class="feature-assessments">
    <div v-for="family in families" :key="family.id" class="feature-assessment-entry">
      <a :href="$withBase(family.url)" class="feature-assessment-link" :class="`bg-${family.slug}`">
        <h3 class="feature-assessment-title">{{family.title}}</h3>
        <div class="feature-assessment-image">
          <img v-if="getFirstImage(family)"
               :src="getFirstImage(family).url" :alt="family.title">
        </div>
      </a>
    </div>
  </div>
</div>
</template>
<style scoped>

:root {
  --assessment-item-width: 340px;
}

.feature-assessments {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--assessment-item-width), 1fr));
  grid-gap: 1rem;
  margin-top: 2rem;
}
.feature-assessment-entry {
}
.feature-assessment-link {
  display: block;
  font-size: 1.2rem;
  text-decoration: none;
  border-radius: var(--block-border-radius);


  &:hover, &:focus, &:focus-within {
    background-color: var(--pdnpa-midbrown);
  }

  .feature-assessment-title {
    border-radius: var(--block-border-radius) var(--block-border-radius) 0 0;
    padding: 1rem;
  }

  .feature-assessment-image {
    overflow: hidden;
    border-radius: 0 0 var(--block-border-radius) var(--block-border-radius);
  }

}
</style>