<template>
  <div id="app">
    <tools></tools>
    <components-parent></components-parent>
    <stage></stage>
    <ele-operate></ele-operate>
    <palette></palette>
  </div>
</template>

<script>
  import './style/base.css'
  import stage from './components/stage.vue'
  import imgEle from './components/imgEle.vue'
  import componentsParent from './components/componentsParent.vue'
  import tools from './components/tools.vue'
  import eleOperate from './components/eleOperate.vue'
  import palette from './components/palette.vue'
  export default {
    name: 'App',
    data(){
      return {}
    },
    created(){
      //禁止右键
      document.oncontextmenu=new Function("event.returnValue=false");
    },
    components: {imgEle, componentsParent, tools, stage, eleOperate,palette}
  }

</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    height: 100%;
  }
</style>

