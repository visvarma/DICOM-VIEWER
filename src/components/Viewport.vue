<template>
  <div class="viewport" ref="viewportElement" @contextmenu.prevent="disableContextMenu"></div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  viewportId: String
})

const viewportElement = ref(null)

const disableContextMenu = () => false
// Expose the internal ref
defineExpose({
  viewportElement
})
</script>

<style scoped>
.viewport {
  width: 100%;
  border: 2px solid var(--border-color);
  box-sizing: border-box;
  background: var(--viewport-bg);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
}

.viewport:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 15px #48bb78;
}
</style>
