<template>
  <div class="preview-mask" @click="closePreview">
    <div class="preview">
      <img :src="url">
      <div>Long press to save</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: String
  },
  methods: {
    closePreview(e) {
      if (e.target.classList.contains('preview-mask')) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.preview-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  .preview {
    width: 70%;
    box-sizing: border-box;
    background-color: #fff;
    padding: 5px;
    text-align: center;
    border-radius: 8px;
    position: relative;
    z-index: 20;
    -webkit-touch-callout: default;
    img {
      width: 100%;
      border-radius: 8px 8px 0 0;
      
    }
    div {
      padding: 10px 0;
      color: var(--textSecondary);
    }
  }
}
</style>