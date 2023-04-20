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
      meshId: 0,
      colors: ["#ff4d4d", "#fff2db", "#fbff1a", "#ff7024"],
      imgUrl: '',
    }
  },
  mounted() {
    this.gradient = new Gradient()
    const canvas = this.$refs.canvas
    this.gradient.initGradient({
      el: canvas,
      colors: this.colors,
      meshId: this.meshId
    })
    window.gradient = this.gradient

    canvas.addEventListener('touchstart', this.onTouchstart)
    canvas.addEventListener('touchmove', this.onTouchMove)
  },
  methods: {
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
      const canvas = this.$refs.canvas
      const url = canvas.toDataURL()
      this.imgUrl = url
      // const downloadLink = document.createElement('a');
      // downloadLink.href = url;
      // downloadLink.target = '__blank'
      // downloadLink.download = `surreal_${this.meshId}.png`;
      // downloadLink.click()
    },
    closePreview() {
      this.imgUrl = ''
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
