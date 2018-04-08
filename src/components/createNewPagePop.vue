<template>
  <pop-box :styleObj="styleObj" :type="type" @changeType="changeType">
    <div slot="content" class="page-inner">
      <h3>创建页面</h3>
      <div>
        <input type="text" placeholder="请输入英文页面名称" class="name-input" v-model="pageName" maxlength="10">
      </div>
      <div>
        <span class="createSubmit" @click="createPage">确定</span>
      </div>
    </div>
  </pop-box>
</template>

<script>
  import axios from 'axios'
  import popBox from './popBox.vue'
  export default {
    name: 'createNewPagePop',
    data () {
      return {
        styleObj: {
          width: '360px',
          height: '150px'
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
      changeType(msg){
        this.$emit('changeType', msg)
      },
      createPage(){
        var self = this
        if (!this.pageName) {
          this.$alert('页面名称不能为空', '提示', {
            confirmButtonText: '确定',
            callback: function () {
            }
          });
          return
        }

        if (this.pageName.length > 10) {
          this.$alert('页面名称应小于10个字符', '提示', {
            confirmButtonText: '确定',
            callback: function () {
            }
          });
          return
        }

        axios.post('/drag/newpage', {
          pageName: self.pageName
        }).then(function (res) {
          if (res.data.code == 200) {
            self.changeType(false)
            self.$store.state.pageName = res.data.pageName
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

  .createSubmit {
    color: white;
    background: dodgerblue;
    padding: 5px 8px;
    border-radius: 5px;
  }

  .name-input {
    padding: 5px;
    margin: 30px 0;
    text-align: center;
  }

</style>
