<template>
  <div class="canvas-wrapper">
    <canvas ref="canvas"></canvas>
  </div>
  <ColorPicker
    :colors="colors"
    :meshId="meshId"
    @meshIdChange="onMeshIdChange"
    @colorChange="onColorChange"
    @exportImage="onExportImage"
  />
  <ImagePreview v-show="imgUrl" :url="imgUrl" @close="closePreview" />
</template>

<script>
import Gradient from './core/gradient'
import ColorPicker from './components/ColorPicker.vue'
import ImagePreview from './components/ImagePreview.vue'

let startX = null

export default {
  components: { ColorPicker, ImagePreview },
  data() {
    return {
      gradient: null,
      canvas: null,
      meshId: 759,
      colors: ['#0099ff', '#8489ff', '#bd76f0', '#e26abc'],
      imgUrl: '',
    }
  },
  mounted() {
    this.gradient = new Gradient()
    this.canvas = this.$refs.canvas
    this.gradient.initGradient({
      el: this.canvas,
      colors: this.colors,
      meshId: this.meshId
    })
    window.gradient = this.gradient

    this.bindEvents()
  },
  methods: {
    bindEvents() {
      this.canvas.addEventListener('touchstart', this.onTouchstart)
      this.canvas.addEventListener('touchmove', this.onTouchMove)
    },
    unbindEvents() {
      this.canvas.removeEventListener('touchstart', this.onTouchstart)
      this.canvas.removeEventListener('touchmove', this.onTouchMove)
    },
    onTouchStart(e) {
      e.preventDefault()
      startX = e.touches[0].pageX
    },
    onTouchMove(e) {
      const curX = e.touches[0].pageX
      const deltaX = curX - startX
      startX = curX
      this.reRender(deltaX)
      this.meshId = this.gradient.getMeshId()
    },
    reRender(distance) {
      this.gradient.render(distance)
    },
    onMeshIdChange(newMeshId) {
      console.log(newMeshId)
      this.gradient.setMeshId(newMeshId)
    },
    onColorChange(colors) {
      this.gradient?.changeColor(colors)
    },
    onExportImage() {
      this.unbindEvents()
      const canvas = this.$refs.canvas
      const url = canvas.toDataURL()
      this.imgUrl = url
    },
    closePreview() {
      this.imgUrl = ''
      this.bindEvents()
    }
  }
}
</script>

<style lang="less">
.canvas-wrapper {
  height: 104vh;
  width: 104vw;
  position: fixed;
  left: -2vw;
  top: -2vh;
  z-index: 1;
  canvas {
    width:100%;
    height:100%;
    // filter: blur(8px);
  }
}
</style>
