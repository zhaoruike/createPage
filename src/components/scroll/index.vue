<template>
  <div :style="data.boxStyle" class="scroll-box" @mouseenter="enter" @mouseleave="leave">
    <div class="content-box" :style="data.contentStyle">
      <slot name="append"></slot>
    </div>
    <div :style="barStyle" class="scroll-bar" v-scrollBar></div>
  </div>    
</template>

<script>
  export default {
    name: 'scrollIndex',
    data () {
      return {
        barStyle:{
          height:"0px",
          top:'0px'
        },
        ele:null,
        startX: 0,
        startY: 0,
        moveX: 0,
        moveY: 0,
        offsetX: 0,
        offsetY: 0,
        preW: 0,
        preH: 0,
        preEle:null
      }
    },
    created () {
			
    },
    mounted () {			
      this.update()
    },
    watch:{
      'data.contentStyle.height'(val){
        this.update()
      }
    },
    props: {
      data:{
        default(){
          return{
            boxStyle:{
              height:'100px',
              width:'100px',
              overflow:'hidden'
            },
            contentStyle:{

            }
          }
        }
      }
    },
    methods: {
      update(){
        this.preEle = this.ele.previousElementSibling
        this.preH = this.preEle.clientHeight
        this.barStyle.height = (parseInt(this.data.boxStyle.height) * parseInt(this.data.boxStyle.height) / this.preH)+"px"
      },
      enter(e){
        let self = this
        document.addEventListener('mousewheel',self.mousewheel)
      },
      leave(e){
        let self = this
        document.removeEventListener('mousewheel',self.mousewheel)
      },
      mousedown (e) {
        e.stopPropagation();
        var self = this
        //点击保存初始状态
        this.$store.state.noSelect = "return false"
        this.startY = e.clientY
        this.startX = e.clientX
        this.offsetY = parseInt(this.barStyle.top)
        //绑定移动和鼠标up事件
        document.addEventListener('mousemove', self.mousemove)
        document.addEventListener('mouseup', self.mouseup)
      },
      mousemove (e) {
        e.stopPropagation();
        var self = this
        this.moveY = e.clientY - this.startY
        this.barStyle.top = (this.offsetY+this.moveY)+'px'
        if(parseInt(this.barStyle.top) < 0){
          this.barStyle.top = '0px'
        }  
        if(parseInt(this.barStyle.top) > (parseInt(this.data.boxStyle.height)-parseInt(this.barStyle.height))){
          this.barStyle.top = (parseInt(this.data.boxStyle.height)-parseInt(this.barStyle.height))+'px'
        } 
        this.preEle.style.top = -(parseInt(this.barStyle.top) * this.preH / parseInt(this.data.boxStyle.height))+'px'
      },
      mouseup (e) {
        e.stopPropagation();
        var self = this
        //移除移动和鼠标up事件
        this.$store.state.noSelect = ""
        document.removeEventListener('mousemove', self.mousemove)
        document.removeEventListener('mouseup', self.mouseup)
      },
      mousewheel (e) {
        if (e.wheelDelta > 0) { //当滑轮向上滚动时  
            this.barStyle.top = (parseInt(this.barStyle.top) - 10) +'px'
            if(parseInt(this.barStyle.top)<0){
              this.barStyle.top = "0px"
            }  
            }  
        if (e.wheelDelta < 0) { //当滑轮向下滚动时  
          this.barStyle.top = (parseInt(this.barStyle.top) + 10) +'px'
          if(parseInt(this.barStyle.top) > (parseInt(this.data.boxStyle.height)-parseInt(this.barStyle.height))){
            this.barStyle.top = (parseInt(this.data.boxStyle.height)-parseInt(this.barStyle.height))+'px'
          } 
        }
        this.preEle.style.top = -(parseInt(this.barStyle.top) * this.preH / parseInt(this.data.boxStyle.height))+'px'
      }
      
    },
    directives: {
      scrollBar:{
        bind: function (el, binding, vnode) {
          var self = vnode.context
          self.ele = el;
          self.ele.addEventListener('mousedown', self.mousedown)
        }
      }
    },
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

  .scroll-bar{
    position:absolute;
    width:4px;
    right:0px;
    border-radius:2px;
    background:rgba(0,0,0,0.5)
  }
  .scroll-box{
    position:relative;
    padding-right:4px;
    overflow:hidden;
    box-sizing:border-box
  }
  .content-box{
    position:absolute;
    width:100%
  }
</style>
