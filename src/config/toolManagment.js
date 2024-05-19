import * as cornerstoneTools from '@cornerstonejs/tools'

export function activateTool(toolName, toolGroupId) {
  const { ToolGroupManager, PanTool, ZoomTool, StackScrollMouseWheelTool, Enums } = cornerstoneTools

  const { MouseBindings } = Enums
  const toolGroup = ToolGroupManager.getToolGroup(toolGroupId)

  // Deactivate all tools
  toolGroup.setToolDisabled(PanTool.toolName)
  toolGroup.setToolDisabled(ZoomTool.toolName)
  toolGroup.setToolDisabled(StackScrollMouseWheelTool.toolName)

  // Activate the selected tool
  if (toolName === 'PanTool') {
    toolGroup.setToolActive(PanTool.toolName, {
      bindings: [{ mouseButton: MouseBindings.Primary }]
    })
  } else if (toolName === 'ZoomTool') {
    toolGroup.setToolActive(ZoomTool.toolName, {
      bindings: [{ mouseButton: MouseBindings.Primary }]
    })
  } else if (toolName === 'StackScrollMouseWheelTool') {
    toolGroup.setToolActive(StackScrollMouseWheelTool.toolName)
  }
}
