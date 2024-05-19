<template>
  <nav class="navbar">
    <h1 class="logo">Dicom Viewer</h1>
    <div class="tool-controls">
      <button
        class="tool-button"
        :class="{ active: activeTool === 'pan' }"
        @click="setActiveTool('pan')"
      >
        <i class="fas fa-arrows-alt"></i> Pan
      </button>
      <button
        class="tool-button"
        :class="{ active: activeTool === 'zoom' }"
        @click="setActiveTool('zoom')"
      >
        <i class="fas fa-search-plus"></i> Zoom
      </button>
      <button
        class="tool-button"
        :class="{ active: activeTool === 'scroll' }"
        @click="setActiveTool('scroll')"
      >
        <i class="fas fa-scroll"></i> Scroll
      </button>
    </div>
  </nav>
</template>

<script setup>
import { defineEmits, ref } from 'vue'

const emit = defineEmits(['pan', 'zoom', 'scroll'])

const activeTool = ref('')

const setActiveTool = (tool) => {
  activeTool.value = tool
  emit(tool)
}
</script>
<style scoped>
.navbar {
  width: 100vw;
  background-color: var(--navbar-background);
  height: 70px;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.logo {
  color: #48bb78;
  position: absolute;
  left: 20px;
  font-size: 2vmin;
}

.tool-button {
  font-family: 'Poppins', sans-serif;
  font-size: 2.5vmin;
  padding: 0.2em 0.8em;
  background: #1a202c;
  color: #cbd5e0;
  border: 1px solid #2d3748;
  margin: 0.1em;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
  box-shadow: 0 0 0 #48bb78;
  transform: translateY(0);
}
.tool-button:first-of-type {
  border-radius: 0.5em 0 0 0.5em;
}
.tool-button:last-of-type {
  border-radius: 0 0.5em 0.5em 0;
}
.tool-button i {
  color: #a0aec0;
  margin-right: 0.3em;
  transition: all 0.2s ease-out;
}
.tool-controls:hover button {
  color: #a0aec0;
}

.tool-controls:hover button:hover {
  background-color: var(--button-hover-bg);
  color: #e2e8f0;
  box-shadow: 0 0 0.8em 0 rgba(56, 161, 105, 0.8);
  transform: translateY(-0.2em);
}
.tool-controls:hover button i {
  color: #c6f6d5;
}
.tool-controls:hover button:hover i {
  color: #fed7e2;
  transform: rotate(-10deg);
}
.active {
  background-color: var(--button-active-bg);
  color: #e2e8f0;
  box-shadow: 0 0 0.8em 0 rgba(56, 161, 105, 0.8);
}
.active i {
  color: #c6f6d5;
}
</style>
