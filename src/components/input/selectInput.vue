<template>  
    <div :style="styleObj" class="select-outer-box" >
      <input class="def-input" v-model="selectValue" @blur="hideList" @focus='showList'>
      <div class="show-box" v-text="selectName" @click="showList"></div>
      <transition name="data-list">
        <ul v-show="listType" class="select-list">
            <li v-for="val in data.list" v-text="val.name" @click="checkValue(val)"></li>
        </ul>
      </transition>
    </div>
</template>

<script>

  export default {
    name: 'selectInput',
    data () {
      return {
        listType: false,
        selectValue:'',
        selectName:''
      }
    },
    created () {
    },
    mounted () {
        var self = this
        this.selectValue = this.data.def
        this.data.list.forEach(function(item,index){
            if(item.value == self.data.def){
                self.selectName = item.name
            }
        })
    },
    watch:{
        data () {
           this.selectValue = this.data.def
           this.data.list.forEach(function(item,index){
               if(item.value == this.data.def){
                   this.selectName = item.name
               }
           })
        }
    },
    props: {
      data: {
        default: function () {
          return {
            list: [{value:'1',name:'zrk'},{value:'2',name:'cjj'}],
            def:'1'
          }
        }
      },
      styleObj:{
          default(){
              return {
              height:'25px',
              width:'150px',
              lineHeight:'25px',
              color:'#ccc',
              fontSize:'14px',
              border:'1px solid black'
              }
            }
      }
    },
    methods: {
      hideList(){
          this.listType = false
      },
      showList(){
          this.listType = true
      },
      checkValue(val){
        this.selectValue = val.value
        this.selectName = val.name
        this.listType = false
        this.data.def = this.selectValue
      },
      changeProType(type, e){
        e.stopPropagation()
        if (parseInt(type)) {
          this.propertyType = true
        }
        if (!parseInt(type)) {
          this.propertyType = false
        }
      },
      changeEle(msg, e){
        var self = this
        for (let attr in msg) {
          if (msg.hasOwnProperty(attr)) {
            if (attr == 'style') {
              for (let att in msg[attr]) {
                if (msg[attr][att].value !== self.data[attr][att]) {
                  self.data[attr][att] = msg[attr][att].value
                }
              }
            }
            if (attr == 'content') {
              for (let att in msg[attr]) {
                if (msg[attr][att] !== self.data[att]) {
                  self.data[att] = msg[attr][att].value
                }
              }
            }
          }
        }
        this.changeProType(msg, e)
      }
    },
    directives: {},
    components: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .select-outer-box{
      min-height:14px;
      position:relative
  }
  .select-outer-box:after{
      position:absolute;
      top:50%;
      transform: translateY(-50%);
      right:6px;     
      width:0px;
      height:0px;
      border:5px solid transparent;
      border-top:5px solid black;
      content:'';
      z-index:-1
  }
  .def-input{
      position:absolute;
      width:100%;
      height:100%;
      opacity:0;
      top:0;
      left:0;
      z-index:1
  }
  .show-box{
      width:100%;
      height:100%;
      color:black;
      padding-left:5px;
      padding-right:8px;
  }
  .select-list{
      position:absolute;
      width:100%;
      top:100%;
      border:1px solid black;
      border-top:none;
      right:-1px
  }

  .select-list > li{
      height:16px;
      font-size:14px;
      line-height:16px;
      display:block;
      padding:4px;
  }

  .select-list > li:hover{
      background:#42b983
  }

  .data-list-enter-active {
    transition: all .5s;
    opacity: 1;
  }

  .data-list-leave-active {
    transition: all .5s;
    opacity: 1;
  }

  .data-list-enter {
    opacity: 0;
  }

  .data-list-leave-to {
    opacity: 0;
  }
</style>
