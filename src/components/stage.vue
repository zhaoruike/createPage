<template>
  <div class="stage-box">
    <div class="stage">
      <img-ele v-for="(val,index) in $store.state.data.imageList" :data="val" :key="'image'+index" :index="index"></img-ele>
      <text-ele v-for="(val,index) in $store.state.data.textList" :data="val" :key="'text'+index" :index="index"></text-ele>
      <self-input :data="inputData"></self-input>
      <self-input :data="inputData"></self-input>
    </div>
  </div>
</template>

<script>
  import imgEle from './imgEle.vue'
  import textEle from './textEle.vue'
  import selfInput from './selfInput.vue'
  export default {
    name: 'stage',
    data () {
      return {
        inputData:{
          type:"color",
          color:'0,0,0,1'
        }
      }
    },

    created () {
    },
    mounted () {

    },
    props: {
      data: {}
    },
    methods: {},
    directives: {},
    components: {imgEle, textEle,selfInput}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .stage-box {
    width: 100%;
    box-sizing: border-box;
    padding-left: 50px;
    position: absolute;
    left: 0;
    top: 0;
    padding-top: 50px;
    height: 100%;
    overflow-y: scroll;
  }

  .stage {
    width: 100%;
    box-sizing: border-box;
    position: relative;
    left: 0;
    top: 0;
    height: 100%;
  }
</style>
