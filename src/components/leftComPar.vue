<template>
  <div>
    <div class="icon-box"  @click="changeType">
      <i :class="defClass"></i>
      <div v-text="name"></div>
      <com-inner-box :type="type"></com-inner-box>
    </div>
  </div>
</template>

<script>
  import comInnerBox from './comInnerBox.vue'
  export default {
    name: 'App',
    data (){
      return {
        type: false
      }
    },
    props: {
      defClass: {
        default: 'icon iconfont icon-tianjiazujian'
      },
      name: {
        default: '组件'
      }
    },
    methods: {
      changeType: function () {
        this.type = !this.type
      }
    },
    components: {comInnerBox}
  }

</script>

<style scoped>

  .icon-box {
    text-align: center;
    padding: 10px 0;
    color: white;
    position: relative;
  }

  .icon-box > i {
    font-size: 20px;
  }

  .icon-box > div {
    font-size: 15px;
    padding: 1px 0;
  }

</style>

