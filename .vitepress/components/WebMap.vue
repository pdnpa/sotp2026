<template>
  <div class="web-map-container-outer">
    <div class="web-map-container">
      <ClientOnly>
        <arcgis-map
            :id="uniqueId"
            ref="mapRef"
            :item-id="props.portalId"
            zoom="9"
            @arcgisViewReadyChange="handleMapReady"
        >


        </arcgis-map>
        <arcgis-legend legend-style="card"
                       card-style-layout="auto" v-if="isMapReady" :reference-element="uniqueId" />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, useId } from 'vue'

// 1. Web components & styles
import "@arcgis/map-components/components/arcgis-map"
import "@arcgis/map-components/components/arcgis-expand"
import "@arcgis/map-components/components/arcgis-legend"
import "@arcgis/map-components/components/arcgis-popup"

import "@arcgis/map-components/main.css"
import "@esri/calcite-components/main.css"
import "@arcgis/core/assets/esri/themes/light/main.css"

const uniqueId = useId();
const isMapReady = ref(false);

const props = defineProps({
  layer: { type: String, default: '' },
  show: { type: String, default: '' },
  portalId: { type: String, default: '8eb77252cba74187ba0763622d316584' }
})

const mapRef = ref(null)
let webmap = null
//  xlegend-style="card"
const handleMapReady = async (event) => {
  const mapElement = event.target
  webmap = mapElement.map

  // Ensure the map element resizes and renders canvas tiles
  if (mapElement.view) {
    mapElement.view.container.style.height = '100%'
    mapElement.view.container.style.width = '100%'
  }

  await webmap.when()
  isMapReady.value = true;
  updateLayerVisibility()
}

const updateLayerVisibility = () => {
  if (!webmap) return

  const showLayers = (props.layer || props.show || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)

  if (showLayers.length > 0) {
    webmap.layers.forEach(layer => {
      layer.visible = showLayers.includes(layer.title)
    })
  }
}

watch(() => [props.layer, props.show], updateLayerVisibility)
</script>

<style scoped>
.web-map-container-outer {
  width: 100%;
}

.web-map-container {
  width: 300px;
  margin: 1em 0;
  border: 6px solid #eddfbd;
  position: relative;
}

arcgis-map {
  height: 350px !important;
  --arcgis-internal-legend-layer-padding: 0 10px;
  --arcgis-internal-legend-heading-margin: 0;
}

/* Custom elements require explicit display block and 100% sizing */
arcgis-map, arcgis-popup {
  display: block !important;
  width: 100% !important;
  /*height: 100% !important;*/
}

arcgis-legend {
  display: block !important;
  max-height: 250px;
  width: 100%;
  overflow-y: auto;
  --arcgis-internal-legend-layer-padding: 0 10px;
}


</style>