<script>
import DynamicComponent from "./DynamicComponent.vue"
import { data } from '../reportdata.data.js'
import RiskScaleBadge from "./RiskScaleBadge.vue";

export default {
  name: "FamilyRiskAssessment",
  components: {RiskScaleBadge, DynamicComponent},
  props: {
    family: {type: Object, required: true}
  },
  data() {
    return {
      risk_levels: [],
      factors: [],
    }
  },
  beforeMount() {
    this.risk_levels = data.risk_levels;
    this.factors = data.factors;
  },

  methods: {
    getAssessmentByFactorId(groupassessments,factorId){

      return Object.values(groupassessments).find(
          (assessment) => assessment.factor.id === factorId
      ) || '';
    },
    getGroupTitleFromGroupAssessments(groupassessments) {
      return Object.values(groupassessments)[0]?.group?.title || '';
    },
    getGroupUrlFromGroupAssessments(groupassessments) {
      return Object.values(groupassessments)[0]?.group?.url || '#';
    }
  }

}
</script>

<template>
<div class="family-risk-assessment">
  <table>
    <thead>
    <tr>
      <th></th>
      <th v-for="factor in factors">
        {{factor.title}}
      </th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="groupassessments in family.riskAssessments">
        <td><a :href="$withBase(getGroupUrlFromGroupAssessments(groupassessments))">{{getGroupTitleFromGroupAssessments(groupassessments)}}</a></td>
        <td v-for="factor in factors" :key="factor.id">
          <RiskScaleBadge :risktype="getAssessmentByFactorId(groupassessments,factor.id)?.risk_level"></RiskScaleBadge>
        </td>
      </tr>
    </tbody>
  </table>


  <div class="risk-assessment-legend">
    <h6>Legend:</h6>
    <table>
      <thead>
      <tr>
        <th class="risk-bg-low"><strong>Very low to low</strong></th>
        <th class="risk-bg-medium"><strong>Medium</strong></th>
        <th class="risk-bg-high"><strong>High</strong></th>
        <th class="risk-bg-veryhigh"><strong>Very high</strong></th>
        <th class="risk-bg-na"><strong>N/A</strong></th>
      </tr>
      </thead>
      <tbody>

      <tr>
        <td><RiskScaleBadge risktype="low" marker></RiskScaleBadge></td>
        <td><RiskScaleBadge risktype="medium" marker></RiskScaleBadge></td>
        <td><RiskScaleBadge risktype="high" marker></RiskScaleBadge></td>
        <td><RiskScaleBadge risktype="veryhigh" marker></RiskScaleBadge></td>
        <td><RiskScaleBadge risktype="na" marker></RiskScaleBadge></td>
      </tr>
      </tbody>

    </table>
  </div>

</div>
</template>

<style scoped lang="scss">

.risk-assessment-legend {
  margin-top: 2rem;
  th {
    font-size: 14px;
  }
  td {
    padding: 0;
  }
}

</style>