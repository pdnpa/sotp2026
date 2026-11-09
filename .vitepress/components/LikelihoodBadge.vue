<script>
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

export default {
  name: 'LikelihoodBadge',
  props: {
    likelihood: {
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
  },
  data() {
    return {

    }
  },
  mounted() {
    tippy('[data-tippy-content]',{placement: 'top-end'});
  },
  computed: {
    marker_class() {
      switch(this.likelihood) {
        case 'unlikely':
        case 'low':
        case 1:
          return 'risk-badge-low';
        case 'possible' :
        case 'medium':
        case 2:
          return 'risk-badge-medium';
        case 'likely' :
        case 'high':
        case 3:
          return 'risk-badge-high';
        case 'almostcertain':
        case 'veryhigh':
        case 4:
          return 'risk-badge-veryhigh';
        case '':
        case 0:
        default:
          return 'risk-badge-na';
      }
    },

    marker_text() {
      switch(this.likelihood) {
        case 'unlikely':
        case 'low':
        case 1:
          return 'Unlikely';
        case 'possible':
        case 'medium':
        case 2:
          return 'Possible';
        case 'likely':
        case 'high':
        case 3:
          return 'Likely';
        case 'almostcertain':
        case 'veryhigh':
        case 4:
          return 'Almost Certain';
        case '':
        case 0:
        default:
          return 'N/A';
      }
    }
  }
}
</script>

<template>
  <div class="risk-indicator" :data-tippy-content="marker_text" :class="[marker_class, {'is-marker': marker}]"><slot v-if="!marker"></slot></div>
</template>