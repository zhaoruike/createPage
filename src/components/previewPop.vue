<template>
  <pop-box :styleObj="styleObj" :type="type" @changeType="leadChangeType">
    <div slot="content" class="page-inner">
      <h3>预览页面</h3>
      <ul class="lead-box">
         <table>
           <tr>
             <th>页面名称</th>
           </tr>
           <tr v-for="val in $store.state.leadList">
             <td>
               <a :href="'//serve.createpage.top/'+val+'.html'" v-text="val" target="_blank"></a>
             </td>
           </tr>
         </table>
      </ul>
    </div>
  </pop-box>
</template>

<script>
  import axios from 'axios'
  import popBox from './popBox.vue'
  export default {
    name: 'previewPop',
    data () {
      return {
        styleObj: {
          width: '200px',
          height: '300px'
        },
        pageName: '',
        window:''
      }
    },

    create () {    
    },
    mounted () {
      this.window = window
    },
    props: {
      type: {
        default: false
      }
    },
    methods: {
      leadChangeType(msg){
        this.$emit('changeType', msg)
      }
    },
    directives: {},
    components: {popBox}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .page-inner {
    text-align: center;
  }

  .lead-box{
    height: 250px ;
    overflow-y: auto;
  }

  table {
    font-size: 14px;
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    border-spacing: 0;
  }

  table td,table th {
    padding: 2px 1px;
    border-bottom: 1px solid #55a532;
  }

</style>
