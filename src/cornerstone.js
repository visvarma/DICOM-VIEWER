// src/cornerstone.js

import { RenderingEngine, Enums, volumeLoader } from '@cornerstonejs/core'
import {
  init as initTools,
  addTool,
  PanTool,
  ZoomTool,
  StackScrollMouseWheelTool,
  ToolGroupManager
} from '@cornerstonejs/tools'
import * as cornerstoneWADOImageLoader from '@cornerstonejs/streaming-image-volume-loader'
import dicomParser from 'dicom-parser'

// Initialize cornerstone tools
initTools()

// Initialize cornerstone WADO image loader
cornerstoneWADOImageLoader.external.cornerstone = cornerstoneWADOImageLoader
cornerstoneWADOImageLoader.external.dicomParser = dicomParser

// Configure the image loader
cornerstoneWADOImageLoader.configure({
  webWorkerPath: '/path/to/cornerstone-wado-image-loader.min.js',
  taskConfiguration: {
    decodeTask: {
      codecsPath: '/path/to/cornerstone-wado-image-loader-codecs.min.js'
    }
  }
})

volumeLoader.registerVolumeLoader(
  'cornerstoneStreamingImageVolumeLoader',
  cornerstoneWADOImageLoader
)

export {
  RenderingEngine,
  Enums,
  volumeLoader,
  addTool,
  PanTool,
  ZoomTool,
  StackScrollMouseWheelTool,
  ToolGroupManager
}
