<template>
  <pop-box :styleObj="styleObj" :type="type" @changeType="leadChangeType">
    <div slot="content" class="page-inner">
      <h3>导入页面</h3>
      <ul class="lead-box">
         <table>
           <tr>
             <th>页面名称</th>
             <th>操作</th>
           </tr>
           <tr v-for="val in $store.state.leadList">
             <td v-text="val"></td>
             <td @click="toLeadPage(val)">确定</td>
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
    name: 'toLeadPagePop',
    data () {
      return {
        styleObj: {
          width: '200px',
          height: '300px'
        },
        pageName: ''
      }
    },

    create () {
    },
    mounted () {

    },
    props: {
      type: {
        default: false
      }
    },
    methods: {
      leadChangeType(msg){
        this.$emit('changeType', msg)
      },
      toLeadPage(val){
        var self = this
        axios.post('http://180.76.54.188/drag/tolead/item', {
          pageName: val
        }).then(function (res) {
          if (res.data.code == 200) {
            self.leadChangeType(false)
            self.$store.state.pageName = res.data.data.pageName
            self.$store.state.data = JSON.parse(res.data.data.data)
          }
          self.$alert(res.data.msg, '提示', {
            confirmButtonText: '确定',
            callback: function () {
            }
          })
        }).catch(function (err) {
          console.log(err)
        })

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
