<script>
import { data } from '../reportdata.data.js'
import { getFirstImage } from '../utils.js'

export default {
  name: "FeatureAssessmentIndex",
  props: {
    isLandingPage: {
      type: Boolean,
      default: false
    },
    showIntros: {
      type: Boolean,
      default: false
    },
    extraPages: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      families: []
    }
  },
  beforeMount() {
    this.families = Object.values(data.reportdata);
  },
  methods: {
    getFirstImage
  }
}
</script>
<template>
<div class="feature-assessment-index">

  <div class="feature-assessments" :class="[isLandingPage ? 'landing-feature-assessments' : '', showIntros ? 'feature-assessments-with-intros' : '' ]">
    <div v-for="family in families" :key="family.id" class="feature-assessment-entry" :class="[isLandingPage ? 'landing-feature-assessment-entry' : '' ]">
      <a :href="$withBase(family.url)" class="feature-assessment-link" :class="[`bg-${family.slug}`, isLandingPage ? 'landing-feature-assessment-link' : '' ]">
        <h3 class="feature-assessment-title" :class="[isLandingPage ? 'landing-feature-assessment-title' : '' ]">{{family.title}}
          <span v-if="showIntros" class="feature-assessment-intro" :class="[isLandingPage ? 'landing-feature-assessment-intro' : '' ]">{{family.description}}</span>
        </h3>
        <div class="feature-assessment-image" :class="[isLandingPage ? 'landing-feature-assessment-image' : '' ]">
          <img v-if="getFirstImage(family)"
               :src="getFirstImage(family).url" :alt="family.title">
        </div>
      </a>
    </div>

    <div v-for="page in extraPages" :key="page.id" class="feature-assessment-entry" :class="[isLandingPage ? 'landing-feature-assessment-entry' : '']" >
      <a :href="page.url" class="feature-assessment-link" :class="[page.bg_class, isLandingPage ? 'landing-feature-assessment-link' : '' ]">
        <h3 class="feature-assessment-title" :class="[isLandingPage ? 'landing-feature-assessment-title' : '' ]">{{page.title}}
          <span v-if="showIntros && page.intro" class="feature-assessment-intro" :class="[isLandingPage ? 'landing-feature-assessment-intro' : '' ]">{{page.intro}}</span>
        </h3>


      </a>
    </div>
  </div>

</div>
</template>
<style scoped>


.feature-assessments {


  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--assessment-item-width), 1fr));
  grid-gap: 1rem;
  margin-top: 2rem;
}

.landing-feature-assessments {
  --assessment-item-width: 310px;
}

.feature-assessment-intro {
  font-size: 0.9rem;
  margin-top: 1rem;
  display: block;
  line-height: 1.2rem;
  font-weight: 400;
  height: 2rem;
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
    padding: 2rem 1rem;
    font-size: 26px;
  }

  .feature-assessment-image {
    overflow: hidden;
    border-radius: 0 0 var(--block-border-radius) var(--block-border-radius);

    img {
      transition: transform 150ms ease-out;
      transform-origin: center center;
      will-change: transform;
      transform: scale3d(1,1,1);
    }

  }
  &:hover, &:focus, &:focus-within {
    .feature-assessment-image {
      img {
        transform: scale3d(1.02, 1.02, 1.02);
      }
    }

  }

  &.bg-pdnpa-lightbrown {
    color: var(--pdnpa-darkbrown);
  }
}

.landing-feature-assessment-link {
  display: flex !important;
  flex-direction: column;
  height: 310px;
}

.landing-feature-assessment-title {
  margin-top: 0;
  padding-bottom: 1rem !important;
}

.landing-feature-assessment-link {
  .landing-feature-assessment-image {
    height: 180px;

    img {
      width: 100% !important;
      max-width: unset !important;
      height: auto;
      transform: scale3d(1, 1, 1) translateY(-11%);
    }
  }
}
.landing-feature-assessment-link {
  &:hover, &:focus, &:focus-visible, &:focus-within {
    .landing-feature-assessment-image {
      img {
        transform: scale3d(1.02, 1.02, 1.02) translateY(-11%);
      }
    }
  }
}

.feature-assessments-with-intros {
  .feature-assessment-intro {
    height: 3rem;
  }
}

</style>