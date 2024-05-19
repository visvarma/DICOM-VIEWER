<!-- src/components/DicomViewer.vue -->

<template>
  <div class="dicom-viewer">
    <ToolControls
      @pan="activateTool('PanTool', toolGroupId)"
      @zoom="activateTool('ZoomTool', toolGroupId)"
      @scroll="activateTool('StackScrollMouseWheelTool', toolGroupId)"
    />
    <div class="viewport-container">
      <Viewport ref="axialViewport" viewportId="CT_AXIAL" />
      <Viewport ref="sagittalViewport" viewportId="CT_SAGITTAL" />
      <Viewport ref="coronalViewport" viewportId="CT_CORONAL" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ToolControls from './ToolControls.vue'
import Viewport from './Viewport.vue'
import {
  setupVolume,
  createToolGroup,
  removeVisibilityChangeListener
} from '../config/setupVolume.js'
import { activateTool } from '../config/toolManagment.js'

const axialViewport = ref(null)
const sagittalViewport = ref(null)
const coronalViewport = ref(null)

const toolGroupId = 'STACK_TOOL_GROUP_ID'
const renderingEngineId = 'myRenderingEngine'
const volumeId = 'cornerstoneStreamingImageVolume:CT_VOLUME_ID'

const viewportIds = ['CT_SAGITTAL', 'CT_AXIAL', 'CT_CORONAL']

// const activatePan = () => activateTool('PanTool', toolGroupId)
// const activateZoom = () => activateTool('ZoomTool', toolGroupId)
// const activateScroll = () => activateTool('StackScrollMouseWheelTool', toolGroupId)

// axialViewport.value.oncontextmenu = () => false
// sagittalViewport.value.oncontextmenu = () => false
// coronalViewport.value.oncontextmenu = () => false

onMounted(() => {
  const axialViewportElement = axialViewport.value.viewportElement
  const sagittalViewportElement = sagittalViewport.value.viewportElement
  const coronalViewportElement = coronalViewport.value.viewportElement

  async function initVolume() {
    await setupVolume({
      axialViewport: axialViewportElement,
      sagittalViewport: sagittalViewportElement,
      coronalViewport: coronalViewportElement,
      viewportIds,
      renderingEngineId,
      volumeId
    })
    createToolGroup(viewportIds, renderingEngineId, toolGroupId, volumeId)
  }

  initVolume()
})

onUnmounted(() => {
  removeVisibilityChangeListener()
})
</script>

<style scoped>
.dicom-viewer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: var(--background-color);
  height: 100%;
}

.viewport-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  height: calc(100vh - 180px);
  gap: 25px;
  margin-top: 100px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  padding: 20px;
}

.viewport {
  flex: 1;
  min-width: 300px;
  background: var(--viewport-bg);
  border: 2px solid var(--border-color);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  padding: 5px;
}
</style>
