<template>
    <div class="login-box">
        <div class="login-title">登陆</div>
        <div><input placeholder="loginname" type="text" v-model="name"></div>
        <div><input placeholder="password" type="password" v-model='password'></div>
        <div class="login-button" @click="toIndex">确定</div>
        <span>如果没有账号，联系qq：1132787601</span>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'login',
    data(){
      return {
          name:'',
          password:''
      }
    },
    methods:{
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
    components: {}
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
.login-box input{
    text-align:center;
    border:none;
    border-bottom:1px solid #ccc;
    height:30px;
    width:100%;
}

.login-title{
    color:green;
    font-size:20px;
    font-weight:bold;
}

.login-button{
    color:white;
    width:30%;
    background:green;
    margin:0 auto;
    margin-top:10px;
    border-radius:10px;
}
</style>

