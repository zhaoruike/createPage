<template>
  <div class="ele-parent">
    <h5>页面高度设置：</h5>
    <div class="page-height-box"><input v-model="pageHeight" type="text"><button @click="commitHeight">确定</button></div>
    <h5>页面名称:</h5>
    <h5 v-text="$store.state.pageName"></h5>
    <ul v-for="(val,key,index) in $store.state.data" :key="key" v-if="val.length > 0" class="ele-list">
      <h4 v-text="key"></h4>
      <table>
        <tr>
          <th>名称</th>
          <th>操作</th>
        </tr>
        <tr v-for="(v,i) in val">
          <td v-text="v.name"></td>
          <td @click="del(key,i)">删除</td>
        </tr>
      </table>
    </ul>
  </div>
</template>

<script>

  export default {
    name: 'eleOperate',
    data () {
      return {
        pageHeight:""
      }
    },
    created () {
      this.pageHeight = parseInt(this.$store.state.pageStyle.height)
    },
    mounted () {

    },
    props: {
      data: {}
    },
    methods: {
      commitHeight(){
        this.$store.state.pageStyle.height = this.pageHeight + 'px'
      }
    },
    directives: {},
    components: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ele-parent {
    padding-top: 50px;
    width: 150px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background: #e1e1e1;
    z-index: 100;
    box-sizing: border-box;
    padding-left:5px;
  }

  .ele-parent  h4{
    padding: 5px 0;
  }

  .ele-list {
    padding: 5px 5px;
  }

  .ele-list > li {
    font-size: 13px;
    padding: 2px 0;
    border-bottom: 1px solid #666666;
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

  .page-height-box > input{
    width:80px;
    margin-right:20px;
  }

</style>
