<script>
import tippy, {createSingleton} from 'tippy.js';
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
    open_on_load: {
      type: Boolean,
      default() {
        return false;
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
      isOpen: false,
    }
  },
  mounted() {
    this.isOpen = this.open_on_load;
    tippy('[data-tippy-content]',{placement: 'top-end'});
  },
  computed: {
    marker_class() {
      switch(this.likelihood) {
        case 'unlikely':
        case 1:
          return 'risk-badge-low';
        case 'possible' :
        case 2:
          return 'risk-badge-medium';
        case 'likely' :
        case 3:
          return 'risk-badge-high';
        case 'almostcertain':
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
          return 'Unlikely';
        case 'medium' :
        case 2:
          return 'Possible';
        case 'high' :
        case 3:
          return 'Likely';
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

<style lang="scss">


$low: #FCFDBF;
$medium: #FC8961;
$high: #B73779;
$veryhigh: #51127C;
$na: #e8e8e8;

$low-text: #030303;
$medium-text: #1c120d;
$high-text: #ffffff;
$veryhigh-text: #ffffff;
$na-text: #434343;

.risk-bg-low {
  background-color: $low;
  color: $low-text;
}
.risk-bg-medium {
  background-color: $medium;
  color: $medium-text;
}
.risk-bg-high {
  background-color: $high;
  color: $high-text;
}
.risk-bg-veryhigh {
  background-color: $veryhigh;
  color: $veryhigh-text;
}
.risk-bg-na {
  background-color: $na;
  color: $na-text;
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
  background-color: $low; color: $low-text;
  &.is-marker {
    background-color: transparent;
    &::before {
      background-color: $low;
      border: 2px solid darken($low, 25%);
      border-radius: 50%; // Circle
    }
  }

  /*&.overall-risk-level {
    background-color: #fff;
  }*/
}

.risk-badge-medium {
  background-color: $medium;
  color: $medium-text;

  &.is-marker {
    background-color: transparent;
    &::before {
      background-color: $medium;
      background-image: $texture-dots;
      // Pentagon Clip-Path
      clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
    }
  }
}

.risk-badge-high {
  background-color: $high; color: $high-text;

  &.is-marker {
    background-color: transparent;
    &::before {
      background-color: $high;
      background-image: $texture-lines;
    }
  }
}

.risk-badge-veryhigh {
  background-color: $veryhigh; color: $veryhigh-text;

  &.is-marker {
    background-color: transparent;
    &::before {
      background-color: $veryhigh;
      background-image: $texture-cross;
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); // Diamond
    }
  }

}

.risk-badge-na {
  background-color: $na; color: $na-text;

  &.is-marker {
    background-color: transparent;
    &::before {
      background-color: $na-text;
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