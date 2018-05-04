<template>
  <div class="tools-box">
    <create-new-page-pop :type="type" @changeType="changeType"></create-new-page-pop>
    <to-lead-page-pop :type="leadType" @changeType="leadChangeType"></to-lead-page-pop>
    <preview-pop :type="previewType" @changeType="previewChangeType"></preview-pop>
    <router-link to="loginpage" class="to-login" v-if="!$store.state.loginType">登陆</router-link>
    <router-link to="userinfo"><div class="head-img" v-if="$store.state.loginType"><img :src="$store.state.userInfo.headImg"  :style="headImgStyle" @load="fitImg($event)" class="img-inner"></div></router-link>
    <ul class="tools-list">
      <li v-for="val in toolsBtn" v-text="val.name" @click="val.click"></li>
    </ul>
    <ul class="op-list">
      <li v-for="val in opList" @click="val.click">
        <i :class="val.icon"></i>
        <span v-text="val.name"></span>
      </li>
    </ul>
  </div>
</template>

<script>
  import {common} from '../common/common.js'
  import axios from 'axios'
  import createNewPagePop from './createNewPagePop.vue'
  import toLeadPagePop from './toLeadPagePop.vue'
  import previewPop from './previewPop.vue'
  export default {
    name: 'imgEle',
    data () {
      return {
        headImgStyle:{
          width:'',
          height:''
        },
        type: false,
        leadType: false,
        previewType: false,
        toolsBtn: [{name: '新建', click: this.newPage}, {name: '导入', click: this.toLead}, {name: '发布', click: this.publish}, {name: '预览', click: this.preview}, {name: '保存', click: this.save}],
        opList: [
          {icon: 'icon iconfont icon-youduiqi', name: '右对齐', click: this.enyRight},
          {icon: 'icon iconfont icon-zuoduiqi', name: '左对齐', click: this.enYLeft},
          {icon: 'icon iconfont icon-shangduiqi', name: '上对齐', click: this.enYTop},
          {icon: 'icon iconfont icon-xiaduiqi', name: '下对齐', click: this.enYBottom}
        ]
      }
    },

    created () {
    },
    mounted () {

    },
    props: {
      data: {}
    },
    methods: {
      fitImg(e){
        let img = e.path[0]
        let offsetW = img.offsetWidth
        let offsetH = img.offsetHeight
        if(offsetW > offsetH){
          this.headImgStyle.width = "100%"
        }else{
          this.headImgStyle.height = "100%"
        }
      },
      changeType(msg){
        this.type = msg
      },
      leadChangeType(msg){
        this.leadType = msg
      },
      previewChangeType(msg){
        this.previewType = msg
      },
      enyRight(){
        let right = parseInt(this.$store.state.ctrlMoveList[0].data.style.width) + parseInt(this.$store.state.ctrlMoveList[0].data.style.left)
        this.$store.state.ctrlMoveList.forEach(function (item, index) {
          item.data.style.left = (right - parseInt(item.data.style.width)) + 'px'
        })
      },
      enYLeft(){
        let left = parseInt(this.$store.state.ctrlMoveList[0].data.style.left)
        this.$store.state.ctrlMoveList.forEach(function (item, index) {
          item.data.style.left = left + 'px'
        })
      },
      enYTop(){
        let top = parseInt(this.$store.state.ctrlMoveList[0].data.style.top)
        this.$store.state.ctrlMoveList.forEach(function (item, index) {
          item.data.style.top = top + 'px'
        })
      },
      enYBottom(){
        let bottom = parseInt(this.$store.state.ctrlMoveList[0].data.style.height) + parseInt(this.$store.state.ctrlMoveList[0].data.style.top)
        this.$store.state.ctrlMoveList.forEach(function (item, index) {
          item.data.style.top = (bottom - parseInt(item.data.style.height)) + 'px'
        })
      },
      publish(){
        var self = this
        common.checkToken().then((type)=>{
           if(res.data.code == 200){
            axios.post('/drag/publish', {
            pageName: self.$store.state.pageName,
            html: document.getElementsByClassName('stage')[0].innerHTML,
            data: JSON.stringify(self.$store.state.data)
            }).then(function (res) {
            self.$alert(res.data.msg, '提示', {
              confirmButtonText: '确定',
              callback: function () {
              }
            });
            }).catch(function (err) {
            })
          }else{
            self.$router.push({path:'/loginpage'})
          }
        })
      },
      preview(){
        var self = this
        common.checkToken().then((res)=>{
          if(res.data.code == 200){
            axios.post('/drag/tolead/list', {}).then(function (res) {
            self.previewType = true
            self.$store.state.leadList = res.data.data
            }).catch(function (err) {
            })
          }else{
            self.$router.push({path:'/loginpage'})
          }
        })
        
      },
      save(){
      },
      newPage(){
        let self = this
        common.checkToken().then((res)=>{
          if(res.data.code == 200){
            self.type = true
          }else{
            self.$router.push({path:'/loginpage'})
          }
        })
      },
      toLead(){
        var self = this
        common.checkToken().then((res)=>{
          if(res.data.code == 200){
             axios.post('/drag/tolead/list', {}).then(function (res) {
              self.leadType = true
              self.$store.state.leadList = res.data.data
              }).catch(function (err) {
              })
          }else{
            self.$router.push({path:'/loginpage'})
          }
        })
       
      }
    },
    directives: {},
    components: {createNewPagePop, toLeadPagePop, previewPop}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tools-box {
    height: 50px;
    position: absolute;
    top: 0;
    left: 0;
    background: black;
    width: 100%;
    z-index: 1000;
    font-family:'微软雅黑';
    
  }

  .tools-list {
    position: absolute;
    line-height:14px;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
  }

  .op-list {
    position: absolute;
    line-height: 1;
    top: 50%;
    transform: translateY(-50%);
    left: 50px;
  }

  .tools-list > li {
    float: left;
    padding: 5px 10px;
    background: #42b983;
    color: white;
    margin-right: 10px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
  }

  .op-list > li {
    float: left;
    color: #42b983;
    /*background: #42b983;*/
    border-radius: 4px;
    padding: 5px 3px;
    margin-right: 4px;
    font-size: 12px;
  }
  .to-login{
    position:absolute;
    line-height:50px;
    padding-left:10px;
    font-size:14px;
    color:green;
    transition:all 0.2s
  }

  .head-img{
    position:absolute;
    height:40px;
    width:40px;
    font-size:0px;
    top:5px;
    left:5px;
    border-radius:50%;
    overflow:hidden
  }
  .img-inner{
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%)
  }
  .to-login:hover{
    transform:scale(1.2)
  }
</style>
