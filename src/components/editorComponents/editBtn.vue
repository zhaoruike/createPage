<template>
    <div>
      <div class="editor-btn-box" v-for="val in btnList">
        <i :class="val.name"></i>
        <button class="editor-btn" @click="val.fn"></button>
      </div>
    </div>      
</template>

<script>
  export default {
    name: 'editBtn',
    data () {
      return {
       btnList:[
         {name:"icon iconfont icon-bold",fn:this.blod},
         {name:"icon iconfont icon-italic",fn:this.italic},
         {name:"icon iconfont icon-underline",fn:this.underline},
         {name:"icon iconfont icon-link",fn:this.link},
         {name:"icon iconfont icon-remove_link",fn:this.removeLink},
         {name:"icon iconfont icon-707bianjiqi_shanchuxian",fn:this.delLine},
        //  {name:"icon iconfont icon-image",fn:this.image},
        //  {name:"icon iconfont icon-insert_tag_field",fn:this.insertField},
         ]
      }
    },
    created () {
			
    },
    mounted () {			

    },
    watch:{
    },
    props: {
      data:{
        default(){
          return{
            name:'icon iconfont icon-bold',
            fn(){return false}
          }
        }
      }
    },
    methods: {
      blod(){
        document.execCommand('Bold','false',null)
      },
      italic(){
        document.execCommand('italic','false',null)
      },
      underline(){
        document.execCommand('Underline','false',null)
      },
      link(){
        document.execCommand("CreateLink","false","https//:www.wtoip.com");
      },
      removeLink(){
        document.execCommand("Unlink","false",null)
      },
      delLine(){
        document.execCommand("strikeThrough","false",null)
      },
      image(){},
      insertField(){}
    },
    directives: {},
    components: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .editor-btn-box{
		font-size:20px;
		display:inline-block;
		position:relative;
    padding:3px 5px;
	}

	.editor-btn-box > button{
		width:100%;
		height:100%;
		position:absolute;
		top:0;
		left:0;
		opacity:0;
	}

	.editor-btn-box > i{
		font-size:20px;
	}
</style>
