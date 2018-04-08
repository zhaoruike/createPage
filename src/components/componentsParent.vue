<template>
  <div class="components-parent">
    <left-com-parent v-for="(val,index) in leftComParentData" :defClass="val.defClass" :name="val.name" :key="index"></left-com-parent>
  </div>
</template>

<script>
  import leftComParent from './leftComPar.vue'
  export default {
    name: 'imgEle',
    data () {
      return {
        leftComParentData: [
          {defClass: 'icon iconfont icon-tianjiazujian', name: '组件'}
        ]
      }
    },

    create () {
    },
    mounted () {

    },
    props: {
      data: {}
    },
    methods: {},
    directives: {},
    components: {leftComParent}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .components-parent {
    padding-top: 50px;
    width: 50px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #444444;
    z-index: 100;
    box-sizing: border-box;
  }
</style>
