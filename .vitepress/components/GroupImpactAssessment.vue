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

    <table class="group-impact-table">
      <thead>
      <tr>
        <th>Impact</th>
        <th>Cause</th>
        <th class="compact-up">Factors</th>
        <th>Severity</th>
        <th>Likelihood</th>
      </tr>
      </thead>
      <tbody class="group-impact-table-body">
      <tr v-for="impact in group.impacts" :key="impact.id">

        <td><span class="mobile-only cell-header">Impact</span>
          <span class="group-impact-title">{{impact.impact}}</span>
        <div class="compact-only factor-list-wrapper mt-4">
          <span class="compact-only cell-header">Factors</span>
          <ul class="factor-list">
            <li v-for="factor in impact.factors" :key="factor.id">

              <div v-if="getFirstImage(factor)">
                <a :href="factor.url ? $withBase(factor.url) : '#'">
                  <img
                      class="factor-image"
                      v-if="getFirstImage(factor)"
                      :src="getFirstImage(factor).url"
                      :alt="factor.factor"
                  />
                  <span class="icon-text">{{ factor.title }}</span></a>
              </div>
              <div v-else>
                <a :href="factor.url ? $withBase(factor.url) : '#'">
                  <span class="image-placeholder"></span>
                  <span class="icon-text">{{ factor.title }}</span></a>
              </div>
            </li>
          </ul>
        </div>
        </td>
        <td>
          <span class="mobile-only cell-header">Cause</span>
          <ul>
            <li v-for="cause in impact.impacts" :key="cause.id">

              {{ cause.impact }}

            </li>
          </ul>
        </td>
        <td class="compact-up">

          <ul class="factor-list">
            <li v-for="factor in impact.factors" :key="factor.id">

              <div v-if="getFirstImage(factor)">
                <a :href="factor.url ? $withBase(factor.url) : '#'">
                  <img
                      class="factor-image"
                      v-if="getFirstImage(factor)"
                      :src="getFirstImage(factor).url"
                      :alt="factor.factor"
                  />
                  <span class="icon-text">{{ factor.title }}</span></a>
              </div>
              <div v-else>
                <a :href="factor.url ? $withBase(factor.url) : '#'">
                  <span class="image-placeholder"></span>
                  <span class="icon-text">{{ factor.title }}</span></a>
              </div>
            </li>
          </ul>

        </td>
        <td>
          <span class="mobile-only cell-header">Severity</span>
          {{impact.severity}}
        </td>
        <td>
          <span class="mobile-only cell-header">Likelihood</span>
          {{impact.likelihood_text}}
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<style scoped lang="scss">

$compact-layout-breakpoint: 1368px;
$table-layout-breakpoint: 1000px;

.group-impact-table {
  td {vertical-align: top}
  ul {
    margin-top: 0;
  }
}
.group-impact-title {
  font-weight: bold;
}

.factor-list {
  @media (min-width: $table-layout-breakpoint) {
    display: flex;
  }
}
.mobile-only {
  display: block;



  .factor-list {
    display: flex;
  }
}
@media (min-width: $table-layout-breakpoint) {
  .mobile-only {
    display: none;
    .factor-list {
      display: none;
    }
  }
  .group-impact-table {
    th:nth-child(2) {
      min-width: 250px;
    }
    th:nth-last-child(1), th:nth-last-child(2) {
      min-width: 240px;
    }
  }
}


@media (max-width: calc($compact-layout-breakpoint - 1px)) {
  .compact-up {
    display: none;
  }
}
@media (min-width: $compact-layout-breakpoint) {
  .compact-only {
    display: none;
  }
}


@media (max-width: calc($table-layout-breakpoint - 1px)) {
  .mobile-up {
    display: none;
  }
  .group-impact-title {
    font-size: 1.4rem;
    margin-top: 1.5rem;
    display: block;
  }
  .factor-list-wrapper {
    border-top: 1px solid var(--vp-c-divider);
    padding-top: 1rem;
    margin-top: 4rem;
  }
  tr, td {
    border-left: none !important;
    border-right: none !important;
    border-top: none !important;
  }
  .group-impact-table {
    thead {
      display: none;
    }
  }
  .group-impact-table-body {
    tr {
      display: flex;
      flex-direction: column;
      padding-top: 2rem;
      padding-bottom: 2rem;
      border-top: none !important;
      margin-bottom: 1.5rem;
      border: 1px solid var(--vp-c-divider);
      border-radius: 8px;
      background-color: var(--vp-c-bg-soft);
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      td:last-child {
        border-bottom: none !important;
      }

    }
    td {
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
    }
  }
}

.cell-header {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 1rem;

}
@media (max-width: calc($table-layout-breakpoint - 1px)) {
  .cell-header {
    display: block;
  }
}
@media (max-width: calc($compact-layout-breakpoint - 1px)) {
  .cell-header.compact-only {
    font-weight: 600;
    color: var(--vp-c-text-2);
    font-size: 1.2rem;
    display: block;
  }
}

</style>