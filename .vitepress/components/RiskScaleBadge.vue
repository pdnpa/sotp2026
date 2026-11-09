<script>
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

export default {
  name: 'RiskScaleBadge',
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
    },
    tooltip: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  mounted() {
    this.isOpen = this.open_on_load;
    const el = this.$refs.badge;
    if (this.tooltip) {
      el.setAttribute('data-tippy-content', this.getMarkerTextFromCustomString(this.tooltip));
    } else if (!this.marker) {
      // el.textContent.trim()
      el.setAttribute('data-tippy-content', '');
    }
    if(el.getAttribute('data-tippy-content')) {
      tippy(el,{placement: 'top-end'});
    }
  },
  methods: {
    getMarkerTextFromCustomString(source) {
      switch(source) {
        case 'low':
        case 1:
          return 'Very low to low';
        case 'medium' :
        case 2:
          return 'Medium';
        case 'high' :
        case 3:
          return 'High';
        case 'veryhigh':
        case 4:
          return 'Very High';
        case '':
        case 0:
          return 'N/A';
        default:
          return source;
      }
    }
  },
  computed: {
    marker_class() {
      switch(this.risktype) {
        case 'low':
        case 1:
          return 'risk-badge-low';
        case 'medium' :
        case 2:
          return 'risk-badge-medium';
        case 'high' :
        case 3:
          return 'risk-badge-high';
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
      switch(this.risktype) {
        case 'low':
        case 1:
          return 'Very low to low';
        case 'medium' :
        case 2:
          return 'Medium';
        case 'high' :
        case 3:
          return 'High';
        case 'veryhigh':
        case 4:
          return 'Very High';
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
  <div class="risk-indicator" :data-tippy-content="tooltip || (marker ? marker_text : undefined)" :class="[marker_class, {'is-marker': marker}]" ref="badge"><slot v-if="!marker"></slot></div>
</template>

<style lang="scss">
:root {
  --risk-low: #FCFDBF;
  --risk-low-text: #030303;
  --risk-low-border: #ced11f;
  --risk-medium: #FC8961;
  --risk-medium-text: #1c120d;
  --risk-high: #B73779;
  --risk-high-text: #ffffff;
  --risk-veryhigh: #51127C;
  --risk-veryhigh-text: #ffffff;
  --risk-na: #e8e8e8;
  --risk-na-text: #434343;
}

.risk-indicator-traffic-light {
  --risk-low: #2e7d32;
  --risk-low-text: #ffffff;
  --risk-low-border: #1b5e20;
  --risk-medium: #d6b83d;
  --risk-medium-text: #321608;
  --risk-high: #e67e22;
  --risk-high-text: #ffffff;
  --risk-veryhigh: #932828;
  --risk-veryhigh-text: #ffffff;
  --risk-na: #e8e8e8;
  --risk-na-text: #434343;
}

.risk-bg-low, .vp-doc table th.risk-bg-low {
  background-color: var(--risk-low);
  color: var(--risk-low-text);
}
.risk-bg-medium, .vp-doc table th.risk-bg-medium {
  background-color: var(--risk-medium);
  color: var(--risk-medium-text);
}
.risk-bg-high, .vp-doc table th.risk-bg-high {
  background-color: var(--risk-high);
  color: var(--risk-high-text);
}
.risk-bg-veryhigh, .vp-doc table th.risk-bg-veryhigh {
  background-color: var(--risk-veryhigh);
  color: var(--risk-veryhigh-text);
}
.risk-bg-na, .vp-doc table th.risk-bg-na {
  background-color: var(--risk-na);
  color: var(--risk-na-text);
}

.risk-level-text {
  font-size: .9rem;
  font-weight: bold;

  &.risk-level-text-red {
    color: red;
  }
  &.risk-level-text-amber {
    color: darkgoldenrod;
  }
  &.risk-level-text-green {
    color: #08a408;
  }
}

// 1. Define Texture Variables (SVG Data URIs for maximum compatibility)
$texture-dots: url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h1v1H1z' fill='%23000' fill-opacity='0.2'/%3E%3C/svg%3E");
$texture-lines: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6L6 0M-1 1L1 -1M5 7L7 5' stroke='%23000' stroke-width='1' stroke-opacity='0.2'/%3E%3C/svg%3E");
$texture-cross: url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 8 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l8 8M8 0L0 8' stroke='%23000' stroke-width='1' stroke-opacity='0.3'/%3E%3C/svg%3E");

// 2. Base Risk Style
.risk-indicator {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 4px;
  font-family: sans-serif;
  font-weight: bold;
  text-align: center;
  justify-content: center;

  &.is-marker {
    // The Shape container
    &::before {
      content: '';
      width: 24px;
      height: 24px;
      display: inline-block;
      flex-shrink: 0;
    }
  }

}

// 3. Level-Specific Modifiers
.risk-badge-low {
  background-color: var(--risk-low);
  color: var(--risk-low-text);
  &.is-marker {
    background-color: transparent;
    &::before {
      background-color: var(--risk-low);
      border: 2px solid var(--risk-low-border);

      border-radius: 50%; // Circle
    }
  }

  /*&.overall-risk-level {
    background-color: #fff;
  }*/
}

.risk-badge-medium {
  background-color: var(--risk-medium);
  color: var(--risk-medium-text);

  &.is-marker {
    background-color: transparent;
    &::before {
      background-color: var(--risk-medium);
      background-image: $texture-dots;
      // Pentagon Clip-Path
      clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
    }
  }
}

.risk-badge-high {
  background-color: var(--risk-high);
  color: var(--risk-high-text);

  &.is-marker {
    background-color: transparent;
    &::before {
      background-color: var(--risk-high);
      background-image: $texture-lines;
    }
  }
}

.risk-badge-veryhigh {
  background-color: var(--risk-veryhigh);
  color: var(--risk-veryhigh-text);

  &.is-marker {
    background-color: transparent;
    &::before {
      background-color: var(--risk-veryhigh);
      background-image: $texture-cross;
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); // Diamond
    }
  }

}

.risk-badge-na {
  background-color: var(--risk-na);
  color: var(--risk-na-text);

  &.is-marker {
    background-color: transparent;
    &::before {
      background-color: var(--risk-na-text);
    }
  }

}


// Level 5 specific texture (Thicker lines, higher contrast)
$texture-critical: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6L6 0M-1 1L1 -1M5 7L7 5' stroke='%23FFF' stroke-width='2' stroke-opacity='0.5'/%3E%3C/svg%3E");

.risk-5 {
  background-color: #ffebee;
  color: #b71c1c;

  &::before {
    background-color: #9b1c1c;
    background-image: $texture-critical; // Applied here
    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);

    // Optional: Add a subtle border to the shape to define the octagon further
    border: 1px solid #6b1111;
  }
}

.risk-badge-low, .risk-badge-medium, .risk-badge-high, .risk-badge-veryhigh {
  &.overall-risk-level {
    background-color: #fff;
  }
}

.risk-key .risk-indicator {
  display: inline-block;
}

</style>
