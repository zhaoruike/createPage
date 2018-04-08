<template>
  <div id="app">
    <tools></tools>
    <components-parent></components-parent>
    <stage></stage>
    <ele-operate></ele-operate>
  </div>
</template>

<script>
  import './style/base.css'
  import stage from './components/stage.vue'
  import imgEle from './components/imgEle.vue'
  import componentsParent from './components/componentsParent.vue'
  import tools from './components/tools.vue'
  import eleOperate from './components/eleOperate.vue'
  export default {
    name: 'App',
    data(){
      return {}
    },
    components: {imgEle, componentsParent, tools, stage, eleOperate}
  }

</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    height: 100%;
  }
</style>

