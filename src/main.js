// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import 'babel-polyfill'
import 'promise-polyfill'
import './style/icon/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(Vuex)

Vue.config.productionTip = false
var state = {
  pageStyle: { height: '500px' },
  noSelect: "",
  colorIntputId: 0,
  colorInputTypeList: [],
  selectColorType: false,
  selectColor: "0,0,0,0",
  pageName: '',
  ctrlMoveList: [],
  leadList: [],
  id: 0,
  data: {
    imageList: [],
    textList: [],
  },
  defEleData: {
    image: {
      name: '图片',
      style: {
        width: '300px',
        height: '100px',
        top: '0px',
        left: '0px',
        position: 'absolute',
        zIndex: 0
      },
      selectType: { single: false, multiple: false },
      type: 'image',
      address: 'http://cp.itolddriver.com/images/def.jpg',
      attribute: {
        style: {
          width: {
            value: '300px',
            type: 'text',
            visible: true
          },
          height: {
            value: '100px',
            type: 'text',
            visible: true
          },
          top: {
            value: '0px',
            type: 'text',
            visible: false
          },
          left: {
            value: '0px',
            type: 'text',
            visible: false
          },
          position: {
            value: 'absolute',
            type: 'text',
            visible: false
          },
          zIndex: {
            value: 0,
            type: 'number',
            visible: true
          },
          active: true,
        },
        content: {
          address: {
            value: 'http://cp.itolddriver.com/images/def.jpg',
            type: 'text',
            visible: true
          },
          name: {
            value: '图片',
            type: 'text',
            visible: true
          },
          active: false,
        }
      }
    },
    text: {
      name: '文字',
      style: {
        width: '100px',
        height: '22px',
        top: '0px',
        left: '0px',
        position: 'absolute',
        lineHeight: 1.5,
        color: 'rgba(0,0,0,1)',
        fontFamily: '微软雅黑'
      },
      selectType: { single: false, multiple: false },
      type: 'text',
      content: '请输入文字',
      attribute: {
        style: {
          width: {
            value: '100px',
            type: 'text',
            visible: true
          },
          height: {
            value: 'auto',
            type: 'text',
            visible: false
          },
          top: {
            value: '0px',
            type: 'text',
            visible: false
          },
          left: {
            value: '0px',
            type: 'text',
            visible: false
          },
          lineHeight: {
            value: '22px',
            type: 'text',
            visible: false
          },
          position: {
            value: 'absolute',
            type: 'text',
            visible: false
          },
          color: {
            value: 'rgba(0,0,0,1)',
            type: 'color',
            visible: true
          },
          fontFamily: {
            value: '微软雅黑',
            type: 'select',
            visible: true,
            list:[{value:1,name:'微软雅黑'},{value:2,name:'楷体'},{value:3,name:'宋体'}],
            def:1
          },
          active: true,
        },
        content: {
          content: {
            tip:'请输入文字',
            value: '',
            type: 'textarea',
            visible: true,
            textarea:''
          },
          active: false,
        }
      }
    }
  }
}
var mutations = {
  ADDITEM: function (argState, item) {
    argState.list = item
  }
}
var getters = {
  getList: function (argState) {
    return argState.list
  }
}
var actions = {
  addItem: function (dis, item) {
    dis.commit('ADDITEM', item)
  }
}
//实例化vuex
var storeObj = new Vuex.Store({
  'state': state,
  'mutations': mutations,
  'getters': getters,
  'actions': actions
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: storeObj,
  router,
  components: { App },
  template: '<App/>'
})
