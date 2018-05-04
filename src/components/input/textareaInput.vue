<template>
    <div class="editor-box">
      <div :style="styleObj" class="textarea-box" contenteditable="true" @keyup="monito($event)"  @click="getFocus" v-text="showText" @input="formate($event)">
        
      </div>
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
    created () {
    },
    mounted () {
      console.log(this.data)
      if(this.data.textarea){
        this.showText = this.data.textarea
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
            value:'',
            textarea:''
          }
        }
      },
      styleObj:{
        default(){
          return {
            width:'100%',
            lineHeight:'25px',
            color:'black',
            fontSize:'14px',
            border:'1px solid black',
            minHeight:'25px',
          }
        }
      }
    },
    methods: {
      formatText(val){
        let newStr = val.replace(/\n/g, '_@').replace(/\r/g, '_#')
        newStr = newStr.replace(/_@/g, '<br/>')
        newStr = newStr.replace(/\s/g, '&nbsp;')
        return newStr
      },
      formate(e){
        let text = e.target.innerText  
        this.data.textarea = text
        this.data.value = this.formatText(this.data.textarea)
      },
      fontBlod(){
        // document.execCommand('Bold','false')
      },
      getFocus(){
        this.showText = this.data.textarea
        this.styleObj.color = "#000"
      },
      monito(event) {
        let obj = event.target
        this.data.textarea = obj.innerText
        event.stopPropagation();
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
  .editor-box{
    border:1px solid #999;
    border-radius:3px 3px 0 0;
    width:100%
  }

  .editor-tools > i{
    font-size:18px;
    padding:2px 5px;
  }

  .editor-tools > i:hover{
    color:green
  }
</style>
