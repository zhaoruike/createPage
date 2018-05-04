<template>
  <div class="stage-box">
    <div class="stage"> 
      <scroll :data="scrollData">
        <div slot="append" style="position:relative;width:100%;height:100%">
          <img-ele v-for="(val,index) in $store.state.data.imageList" :data="val" :key="'image'+index" :index="index"></img-ele>
          <text-ele v-for="(val,index) in $store.state.data.textList" :data="val" :key="'text'+index" :index="index"></text-ele>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import imgEle from './imgEle.vue'
  import textEle from './textEle.vue'
  import selfInput from './selfInput.vue'
  import editor from './editor.vue'
  import scroll from './scroll/index.vue'
  import imageClipping from './imageClipping/index.vue'
  export default {
    name: 'stage',
    data () {
      return {
        scrollData:{
          boxStyle:{
            height:'100%',
            width:'100%',
            overflow:'hidden'
          },
          contentStyle:{}
        },
        inputData:{
          type:"textarea",
          data:{
            defDate:new Date().getTime(),
						format:"yyyy-MM-dd",
						backValue:""
          }
        }
      }
    },

    created () {
      this.scrollData.contentStyle = this.$store.state.pageStyle
    },
    mounted () {

    },
    props: {
      data: {}
    },
    methods: {},
    directives: {},
    components: {imgEle, textEle,selfInput,editor,scroll,imageClipping}
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
    padding-right:150px
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
