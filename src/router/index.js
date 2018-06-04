import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import index from '@/components/index.vue'
// import login from '@/components/login.vue'
// import userInfo from '@/components/userInfo.vue'
const index = () => import('@/components/index.vue')
const login = () => import('@/components/login.vue')
const userInfo = () => import('@/components/userInfo.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component:index
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/tologin',
      name: 'login',
      component:login
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component: userInfo
    },
    {
      path:'*',
      redirect:'/'
    }
  ]
})
