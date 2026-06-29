<script>
import { data } from '../reportdata.data.js'

export default {
  name: "ReferenceList",
  props: {
    referenceIds: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      highlightedId: null,
      highlightTimeout: null
    }
  },
  computed: {
    references() {
      // Sort IDs and map to reference objects, ensuring uniqueness
      return [...new Set(this.referenceIds)]
        .sort((a, b) => parseInt(a) - parseInt(b))
        .map(id => data.references[id])
        .filter(ref => !!ref);
    }
  },
  mounted() {
    window.addEventListener('hashchange', this.handleHashChange);
    // Check initial hash on load
    this.handleHashChange();
  },
  beforeUnmount() {
    window.removeEventListener('hashchange', this.handleHashChange);
    if (this.highlightTimeout) clearTimeout(this.highlightTimeout);
  },
  methods: {
    handleHashChange() {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#footnote_')) {
        const id = hash.replace('#footnote_', '');
        this.triggerHighlight(id);
      }
    },
    triggerHighlight(id) {
      this.highlightedId = id;
      if (this.highlightTimeout) clearTimeout(this.highlightTimeout);
      this.highlightTimeout = setTimeout(() => {
        this.highlightedId = null;
      }, 5000); // Highlight for 3 seconds
    },
    getReferenceDate(reference) {
      return reference.reference_date_year ?? reference.reference_date;
    },
    truncate(text, limit = 30) {
      if (!text || text.length <= limit) return text
      return text.slice(0, limit) + '...'
    },
    formatAccessedDate(value) {
      if (!value) return ''

      const [datePart] = String(value).split(' ')
      const [year, month, day] = datePart.split('-')

      return `${day}/${month}/${year}`
    }
  }
}
</script>

<template>
  <div v-if="references.length > 0" class="reference-list-container">
    <h2 id="references">References</h2>
    <table>
      <thead>
        <tr>
          <th><em>Ref</em></th>
          <th class="reference-author">Author</th>
          <th class="reference-year">Date</th>
          <th class="reference-title">Title</th>
          <th class="reference-link">Link</th>
          <th class="reference-accessed">Data accessed</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="ref in references" :key="ref.id" :id="`footnote_${ref.id}`" 
            class="reference-item" :class="{ 'is-highlighted': highlightedId == ref.id }">
          <td class="reference-ref"><a :href="`#fnref-${ref.id}`" class="back-link" title="Go to first usage in page">{{ ref.id }}</a></td>
          <td class="reference-author">{{ ref.author }}</td>
          <td class="reference-year">{{ getReferenceDate(ref) }}</td>
          <td class="reference-title" v-if="ref.title"><em>{{ ref.title }}</em></td>
          <td class="reference-link" v-if="ref.link"><a :href="ref.link" target="_blank">{{ truncate(ref.link, 30) }}</a></td>
          <td class="reference-accessed" v-if="ref.date_accessed">{{ formatAccessedDate(ref.date_accessed) }}</td>
          <td><a :href="`#fnref-${ref.id}`" class="back-link" title="Back to text"> ↖</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.reference-list-container {
  margin-top: 3rem;
  padding-top: 1rem;


  table {
    border: none;
    border-collapse: collapse;
    td, th {
      border: none;
      background-color: transparent;
    }
    thead {
      tr {
        border-top: none;
        border-bottom: 1px solid var(--vp-c-divider);
      }
    }
    tr {
      border-top: none;
    }
    tr {
      transition: box-shadow 0.3s ease, background-color 0.3s ease;
      outline: none; /* Remove default focus outline */
    }
  }
}
.reference-list {
  font-size: 0.9rem;
  padding-left: 1.5rem;
}
.reference-item {
  margin-bottom: 0.75rem;
  line-height: 1.5;
  transition: background-color 0.5s ease;

  &.is-highlighted {

    background-color: rgba(255, 255, 255, 0.05);
    box-shadow: inset 0 0 7px 3px rgb(249 251 67 / 70%);
    border-radius: 4px;

  }
  
  &:target {
    background-color: var(--vp-c-yellow-soft);
  }
}
.back-link {
  text-decoration: none;
  margin-left: 0.5rem;
  color: var(--vp-c-brand);
  font-weight: bold;
}
</style>
