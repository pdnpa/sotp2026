<script lang="ts">
import {defineComponent} from 'vue'
import { data } from '../reportdata.data.js'
import { getFirstImage } from '../utils.js'

export default defineComponent({
  name: "FactorIndex",
  data() {
    return {
      factors: []
    }
  },
  beforeMount() {
    this.factors = Object.values(data.factors);
  },
  methods: {
    getFirstImage
  }
})
</script>

<template>
  <div class="feature-assessment-index">

    <div class="factors">
      <div v-for="factor in factors" :key="factor.id" class="factor-list-entry">
        <a :href="$withBase(factor.url)" class="factor-list-link" :class="`bg-${factor.slug}`">
          <h3 class="factor-list-title">{{factor.title}}</h3>
          <div class="factor-list-image" :class="`bg-${factor.slug}`">
            <img v-if="getFirstImage(factor)"
                 :src="getFirstImage(factor).url" :alt="factor.title">
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.factors {


  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--assessment-item-width), 1fr));
  grid-gap: 1rem;
  margin-top: 2rem;
}
.factor-list-entry {
}
.factor-list-link {
  display: block;
  font-size: 1.2rem;
  text-decoration: none;
  border-radius: var(--block-border-radius);
  background-color: var(--pdnpa-midbrown);
  transition: backgroundColor 120ms ease-in-out;

  &:hover, &:focus, &:focus-within {

    background: var(--pdnpa-midbrown-lightforeground);
  }

  .factor-list-title {
    border-radius: var(--block-border-radius) var(--block-border-radius) 0 0;
    padding: 1rem;
    color: var(--pdnpa-lightgrey);
  }

  .factor-list-image {
    overflow: hidden;
    border-radius: 0 0 var(--block-border-radius) var(--block-border-radius);
    text-align: center;
    background: #6494a2;
    padding-bottom: 1rem;

    img {
      max-width: 150px;
      margin: 0 auto;
      transition: transform 150ms ease-out, backgroundColor 120ms ease-in-out;
      transform-origin: center center;
      will-change: transform;
      transform: scale3d(1,1,1);
    }

    &:hover, &:focus, &:focus-within {
      img {
        transform: scale3d(1.05, 1.05, 1.05);
      }

    }

  }

}
</style>