import { RenderingEngine, volumeLoader, Enums, setVolumesForViewports } from '@cornerstonejs/core'
import {
  initDemo,
  createImageIdsAndCacheMetaData,
  setCtTransferFunctionForVolumeActor
} from '@/utils/demo/helpers'

import * as cornerstoneTools from '@cornerstonejs/tools'

let handleVisibilityChange = null

export async function setupVolume({
  axialViewport,
  sagittalViewport,
  coronalViewport,
  viewportIds,
  renderingEngineId,
  volumeId
}) {
  await initDemo()

  const renderingEngine = new RenderingEngine(renderingEngineId)

  const viewportInput = [
    {
      viewportId: 'CT_SAGITTAL',
      element: sagittalViewport,
      type: Enums.ViewportType.ORTHOGRAPHIC,
      defaultOptions: {
        orientation: Enums.OrientationAxis.SAGITTAL
      }
    },
    {
      viewportId: 'CT_AXIAL',
      element: axialViewport,
      type: Enums.ViewportType.ORTHOGRAPHIC,
      defaultOptions: {
        orientation: Enums.OrientationAxis.AXIAL
      }
    },
    {
      viewportId: 'CT_CORONAL',
      element: coronalViewport,
      type: Enums.ViewportType.ORTHOGRAPHIC,
      defaultOptions: {
        orientation: Enums.OrientationAxis.CORONAL
      }
    }
  ]

  renderingEngine.setViewports(viewportInput)

  const imageIds = await createImageIdsAndCacheMetaData({
    StudyInstanceUID: '1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463',
    SeriesInstanceUID: '1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561',
    wadoRsRoot: 'https://d3t6nz73ql33tx.cloudfront.net/dicomweb'
  })

  const volume = await volumeLoader.createAndCacheVolume(volumeId, { imageIds })

  volume.load()

  await setVolumesForViewports(
    renderingEngine,
    [{ volumeId, callback: setCtTransferFunctionForVolumeActor }],
    viewportIds
  )

  renderingEngine.renderViewports(viewportIds)

  handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      renderingEngine.renderViewports(viewportIds)
    }
  }
  document.addEventListener('visibilitychange', handleVisibilityChange)
}

export function createToolGroup(viewportIds, renderingEngineId, toolGroupId, volumeId) {
  const { LengthTool, ToolGroupManager, StackScrollMouseWheelTool, ZoomTool, PanTool } =
    cornerstoneTools

  cornerstoneTools.addTool(ZoomTool)
  cornerstoneTools.addTool(StackScrollMouseWheelTool)
  cornerstoneTools.addTool(PanTool)

  const toolGroup = ToolGroupManager.createToolGroup(toolGroupId)
  // Add tools to the tool group

  toolGroup.addTool(ZoomTool.toolName, { volumeId })
  toolGroup.addTool(PanTool.toolName, { volumeId })
  toolGroup.addTool(StackScrollMouseWheelTool.toolName)

  // Set tool group for each viewport
  viewportIds.forEach((viewportId) => {
    toolGroup.addViewport(viewportId, renderingEngineId)
  })
}

export function removeVisibilityChangeListener() {
  if (handleVisibilityChange) {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  }
}
