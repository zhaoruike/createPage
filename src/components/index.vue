<template>
  <div>
    <tools></tools>
    <components-parent></components-parent>
    <stage></stage>
    <ele-operate></ele-operate>
    <palette v-show="$store.state.selectColorType"></palette>
  </div>
</template>

<script>
  import axios from 'axios'
  import '../style/base.css'
  import stage from './stage.vue'
  import imgEle from './imgEle.vue'
  import componentsParent from './componentsParent.vue'
  import tools from './tools.vue'
  import eleOperate from './eleOperate.vue'
  import palette from './palette.vue'
  import popClipping from './popClipping.vue'
  export default {
    name: 'index',
    data(){
      return {}
    },
    created(){
    },
    mounted(){
      let self = this
      axios.post('/login/check',{}).then(function(res){
        if(res.data.code !== 200){
          self.$router.push({path:'/loginpage'})
        }else{
          self.$store.state.loginType = true
          self.$store.state.userInfo = res.data.data
        }
      }).catch(function(error){})
    },
    components: {imgEle, componentsParent, tools, stage, eleOperate,palette,popClipping}
  }

</script>

<style scoped>

</style>

