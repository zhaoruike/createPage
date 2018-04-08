<template>
  <div class="pop-box" v-if="type">
    <div class="pop-inner-box" :style="styleObj">
      <span class="close-btn" v-on:click="changeType">×</span>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'popBox',
    data () {
      return {
      }
    },

    create () {
    },
    mounted () {

    },
    watch:{
    },
    props: {
      styleObj: {
        default(){
          return {
            width: '500px',
            height: '300px'
          }
        }
      },
      type:{
        default:false
      }
    },
    methods: {
      changeType(){
        this.$emit('changeType',false)
      }
    },
    directives: {},
    components: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pop-box {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0
  }

  .pop-inner-box {
    border: 1px solid #dcdcdc;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: whitesmoke;
    padding: 15px 10px;
    border-radius: 4px;
  }

  .close-btn {
    font-size: 16px;
    color: #666666;
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: default;
  }

</style>
