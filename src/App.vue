<template>
  <div id="app" :onselectstart="$store.state.noSelect">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return {
        name:1,
        age:18,
        transType:true
      }
    },
    created(){
      let self = this
      //禁止右键
      document.oncontextmenu=new Function("event.returnValue=false");
    },
    mounted(){
      console.log(this.$data)
    },
    components: {}
  }

</script>

<style scoped>
  #app{
    width:100%;
    height:100%
  }
  .trans-box{
    position:fixed;
    background-color:white;
    z-index:10000;
    width:100%;
    height:100%;
    top:0;
    left:0
  }
</style>

