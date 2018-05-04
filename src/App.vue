<template>
  <div id="app" :onselectstart="$store.state.noSelect">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return {}
    },
    created(){
      //禁止右键
      document.oncontextmenu=new Function("event.returnValue=false");
    },
    components: {}
  }

</script>

<style scoped>

</style>

