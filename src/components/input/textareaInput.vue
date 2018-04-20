<template>  
    <div :style="styleObj" class="textarea-box" contenteditable="true" @keyup="monito($event)"  @click="getFocus" v-text="showText">
    </div>
</template>

<script>
  export default {
    name: 'textareaInput',
    data () {
      return {
       showText:''
      }
    },
    create () {
    },
    mounted () {
      if(this.data.data){
        this.showText = this.data.data
        this.styleObj.color = "#000"
      }else{
        this.showText = this.data.tip
        this.styleObj.color = "#ccc"
      }
    },
    watch:{
    },
    props: {
      data:{
        default(){
          return{
            tip:'请输入文字...',
            data:''
          }
        }
      },
      styleObj:{
        default(){
          return {
            width:'300px',
            lineHeight:'25px',
            color:'black',
            fontSize:'14px',
            border:'1px solid black'
          }
        }
      }
    },
    methods: {
      getFocus(){
        this.showText = this.data.data
        this.styleObj.color = "#000"
      },
      monito(event) {
        let obj = event.target
        this.data.data = obj.innerText
        if (window.getSelection) {//ie11 10 9 ff safari
          obj.focus(); //解决ff不获取焦点无法定位问题
          var range = window.getSelection();//创建range
          range.selectAllChildren(obj);//range 选择obj下所有子内容
          range.collapseToEnd();//光标移至最后
        }else if (document.selection) {//ie10 9 8 7 6 5
          var range = document.selection.createRange();//创建选择对象
          //var range = document.body.createTextRange();
          range.moveToElementText(obj);//range定位到obj
          range.collapse(false);//光标移至最后
          range.select();
        }
}
    },
    directives: {},
    components: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
