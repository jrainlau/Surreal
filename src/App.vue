<template>
  <div class="canvas-wrapper" @touchstart="onTouchStart" @touchmove="onTouchMove">
    <canvas ref="canvas"></canvas>
  </div>
  <div style="position: relative; top: 100px; left: 100px; z-index: 100;">{{ meshId }}</div>
</template>

<script>
import Gradient from './core/gradient'

let startX = null

export default {
  data() {
    return {
      gradient: null,
      meshId: 0,
    }
  },
  mounted() {
    this.gradient = new Gradient()
    const canvas = this.$refs.canvas
    this.gradient.initGradient({
      el: canvas,
      colors: ["#ff4d4d", "#fff2db", "#fbff1a", "#ff7024"],
      meshId: this.meshId
    })
    window.gradient = this.gradient
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
  canvas {
    width:100%;
    height:100%;
    // filter: blur(8px);
  }
}
</style>
