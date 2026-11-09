<script>
import RiskScaleBadge from './RiskScaleBadge.vue';

export default {
  name: 'RiskScaleBadgeTrafficLight',
  components: {
    RiskScaleBadge
  },
  props: {
    risktype: {
      type: [String, Number],
      default() {
        return '';
      }
    },
    marker: {
      type: Boolean,
      default() {
        return false;
      }
    }
  }
}
</script>

<template>
  <RiskScaleBadge class="risk-indicator-traffic-light" :risktype="risktype" :marker="marker">
    <slot />
  </RiskScaleBadge>
</template>
