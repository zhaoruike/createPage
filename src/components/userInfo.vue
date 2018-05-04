<template>
    <div class="login-box">
        <div class="head-img" v-if="$store.state.loginType"><img :src="$store.state.userInfo.headImg"  :style="headImgStyle" @load="fitImg($event)" class="img-inner"></div>
        <a href="javascript:;" @click="showPop">修改头像</a>
				<router-link to="/">回首页</router-link>
        <pop-clipping :type="type" @changeType="changeType" @imgUrl="imgUrl"></pop-clipping>
  </div>
</template>

<script>
  import axios from 'axios'
  import popClipping from './popClipping.vue'
  export default {
    name: 'login',
    data(){
      return {
        headImgStyle:{
          width:'',
          height:''
        },
        type:false
      }
    },
    methods:{
        imgUrl(msg){
            let self = this
            if(msg.data.code == 200){
							axios.post('/login/updataheadimg',{headImg:msg.data.data}).then(function(res){
								self.$store.state.userInfo.headImg = msg.data.data
								self.type = false
							}).catch(function(err){console.log(err)})
            }   
        },
        showPop(){this.type = true},
        changeType(msg){
            this.type = msg
        },
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
        toIndex(){
            var self = this
            axios.post('/login/login', {
            name: self.name,
            password: self.password
            }).then(function (res) {
                self.$alert(res.data.msg, '提示', {
                confirmButtonText: '确定',
                callback: function () {
                    if(res.data.code == 200){
                        self.$store.state.loginType = true
                        self.$store.state.userInfo = res.data.data
                        self.$router.push({path: 'index'})
                    }
                }
            });
            }).catch(function (err) {
            })
        }
    },
    created(){
    },
    components: {popClipping}
  }

</script>

<style scoped>
.login-box{
    min-width:300px;
    width:50%;
    margin:0 auto;
    padding-top:200px;
    text-align:center;
    line-height:40px;
    font-size:16px;
}
.head-img{
    height:60px;
    width:60px;
    font-size:0px;
    border-radius:50%;
    margin:0 auto;
    position:relative;
		overflow:hidden;
  }
  .img-inner{
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%)
  }
</style>

