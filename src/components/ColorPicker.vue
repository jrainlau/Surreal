<template>
  <div class="color-picker">
    <div class="console">
      <div class="mesh-id">
        <input type="text" pattern="\d*" inputmode="numeric" v-model="curMeshId" @input="updateMeshId">
      </div>
      <ul class="colors">
        <li v-for="i in 4" class="color" :style="getColor(i - 1)">
          <input type="color" v-model="colorList[i - 1]" @blur="onColorChange">
        </li>
        <li class="color" @click="autoGenerateColors">A</li>
      </ul>
    </div>
    <div class="export" @click="exportImage">
      EXPORT
    </div>

    <!-- <input type="color" id="color-picker" ref="colorPicker" @change="onColorChange"> -->
  </div>
</template>

<script>
import { generateColors } from '../utils'
export default {
  props: {
    colors: Array,
    meshId: Number,
  },
  data() {
    return {
      colorList: [undefined, undefined, undefined, undefined],
      autoColor: false,
      curMeshId: 0,
    }
  },
  created() {
    this.colorList = this.colors
    this.curMeshId = this.meshId
  },
  watch: {
    meshId(val) {
      this.curMeshId = val
    }
  },
  methods: {
    getColor(index) {
      const color = this.colorList[index] || 'transparent'
      return `background-color: ${color};`
    },
    updateMeshId() {
      this.$emit('meshIdChange', this.curMeshId)
    },
    exportImage() {
      this.$emit('exportImage')
    },
    onColorChange() {
      this.$emit('colorChange', this.colorList)
    },
    autoGenerateColors() {
      const [color1] = this.colorList
      const newColorList = generateColors(color1)
      console.log(newColorList)
      this.colorList = newColorList
      this.onColorChange()
    }
  }
}
</script>

<style lang="less" scoped>
.color-picker {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding-bottom: env(safe-area-inset-bottom);
  .switch {
    width: 50px;
    height: 50px;
    background-color: #fff;
    border-radius: 8px;
  }
  .console {
    display: flex;
    flex-direction: column;
    align-items: center;
    // background-color: var(--consoleBg);
    color: var(--textPrimary);
    .colors {
      display: flex;
      list-style: none;
      padding: 0;
      margin: 0;
      .color {
        width: 40px;
        height: 40px;
        line-height: 35px;
        text-align: center;
        border: 2px solid var(--borderColor);
        box-sizing: border-box;
        border-radius: 8px;
        font-family: monaco;
        font-size: 32px;
        &:not(:last-child) {
          margin-right: 10px;
        }
        input[type="color"] {
          opacity: 0;
        }
      }
    }
    .mesh-id {
      input {
        text-align: center;
        background: none;
        border: none;
        font-family: monaco;
        width: 6em;
        border-bottom: 2px solid var(--textPrimary);
        font-size: 24px;
        color: var(--textPrimary);
        margin-bottom: 10px;
        margin-left: 5px;
        outline: none;
        border-radius: 0;
      }
    }
  }
  .export {
    padding: 20px 10px;
    background-color: var(--downloadBg);
    border-radius: 8px;
    height: fit-content;
    color: var(--textPrimary);
  }
}
</style>