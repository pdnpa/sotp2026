<script>
import { getFirstImage } from '../utils.js'

export default {
  name: "GroupImpactAssessment",
  props: {
    group: {type: Object, required: true}
  },
  methods: {
    getFirstImage
  }
}

</script>

<template>
  <div class="group-section-block pt-0">

    <table>
      <thead>
      <tr>
        <th>Impact</th>
        <th>Cause</th>
        <th>Factors</th>
        <th>Severity</th>
        <th>Likelihood</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="impact in group.impacts" :key="impact.id">
        <td>{{impact.impact}}</td>
        <td>
          <ul>
            <li v-for="cause in impact.impacts" :key="cause.id">

              {{ cause.impact }}

            </li>
          </ul>
        </td>
        <td>

          <ul class="factor-list">
            <li v-for="factor in impact.factors" :key="factor.id">

              <div v-if="getFirstImage(factor)">
                <a :href="$withBase(factor.url)">
                  <img
                      class="factor-image"
                      v-if="getFirstImage(factor)"
                      :src="getFirstImage(factor).url"
                      :alt="factor.factor"
                  />
                  <span class="icon-text">{{ factor.title }}</span></a>
              </div>
              <div v-else>
                <a :href="$withBase(factor.url)">
                  <span class="image-placeholder"></span>
                  <span class="icon-text">{{ factor.title }}</span></a>
              </div>
            </li>
          </ul>

        </td>
        <td>
          {{impact.severity}}
        </td>
        <td>
          {{impact.likelihood_text}}
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<style scoped>

</style>