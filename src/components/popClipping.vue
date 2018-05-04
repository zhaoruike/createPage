<template>
  <pop-box :styleObj="styleObj" :type="type" @changeType="leadChangeType">
    <div slot="content" class="">
      <image-clipping @imgUrl="imgUrl"></image-clipping>
    </div>
  </pop-box>
</template>

<script>
  import axios from 'axios'
  import popBox from './popBox.vue'
  import imageClipping from './imageClipping/index.vue'
  export default {
    name: 'popClipping',
    data () {
      return {
        styleObj: {
          width: '800px',
          height: '500px'
        },
      }
    },

    created () {    
    },
    mounted () {
    },
    props: {
      type: {
        default: false
      }
    },
    methods: {
      imgUrl(msg){
        this.$emit('imgUrl',msg)
      },
      leadChangeType(msg){
        this.$emit('changeType', msg)
      }
    },
    directives: {},
    components: {popBox,imageClipping}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  

</style>
