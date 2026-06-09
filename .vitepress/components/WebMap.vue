<template>
  <div ref="mapDiv" class="web-map-container"></div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  layer: {
    type: String,
    default: ''
  },
  show: {
    type: String,
    default: ''
  },
  portalId: {
    type: String,
    default: '8eb77252cba74187ba0763622d316584'
  }
})

const mapDiv = ref(null)
let view = null
let webmap = null

const initMap = async () => {
  if (typeof window === 'undefined') return

  try {
    // Use ESM from CDN
    const [WebMap, MapView] = await Promise.all([
      import('https://js.arcgis.com/4.34/@arcgis/core/WebMap.js'),
      import('https://js.arcgis.com/4.34/@arcgis/core/views/MapView.js')
    ]).then(modules => modules.map(m => m.default))

    webmap = new WebMap({
      portalItem: {
        id: props.portalId
      }
    })

    view = new MapView({
      container: mapDiv.value,
      map: webmap
    })

    await webmap.when()
    updateLayerVisibility()
  } catch (e) {
    console.error('Failed to load ArcGIS modules:', e)
  }
}

const updateLayerVisibility = () => {
  if (!webmap) return

  const showLayers = (props.layer || props.show || '')
    .split(',')
    .map(s => s.trim())
    .filter(s => s)

  webmap.allLayers.forEach(layer => {
    // If showLayers is empty, maybe keep default? 
    // Original code says: Everything off by default, then turn on whatever is in ?show=
    if (showLayers.length > 0) {
      layer.visible = showLayers.includes(layer.title)
    }
  })
}

watch(() => props.layer, updateLayerVisibility)
watch(() => props.show, updateLayerVisibility)

onMounted(() => {
  // Load CSS
  if (!document.getElementById('arcgis-css')) {
    const link = document.createElement('link')
    link.id = 'arcgis-css'
    link.rel = 'stylesheet'
    link.href = 'https://js.arcgis.com/4.34/esri/themes/light/main.css'
    document.head.appendChild(link)
  }

  initMap()
})

onBeforeUnmount(() => {
  if (view) {
    view.destroy()
  }
})
</script>

<style scoped>
.web-map-container {
  height: 500px;
  width: 100%;
  margin: 1em 0;
  border: 1px solid #ccc;
}
</style>
