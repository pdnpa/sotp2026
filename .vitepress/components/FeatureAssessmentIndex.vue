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

  <div v-for="family in families" :key="family.id">
    <h2><a :href="$withBase(family.url)">{{family.title}}</a></h2>
  </div>
</div>
</template>
<style scoped>

</style>