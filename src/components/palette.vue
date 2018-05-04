<template>
  <base-shape :index="index" :baseData="data" :parent="'body'" :select="0">
    <div slot="append" class="outer-palette" v-parent>
      <div class="title"><span>色板</span><span @click="closeColor">×</span></div>
			<div class="select-color-box">
        <ul >
          <li v-for="val in commonColors" ><span :style="{backgroundColor:'rgb('+val+')'}" @click="checkCommonColors(val)"></span></li>
        </ul>
        <ul @click="allColorsSelect($event)">
          <li v-for="val in allColors" :style="{background:'linear-gradient(to right,rgb('+val.from+'),rgb('+val.to+'))'}"></li>
        </ul>
        <ul v-dragY>
          <span :style="spanStyle"></span>
        </ul>
        <div class="color-show-box">
          <div class="color-show-box-top">
            <div :style="{background:'rgba('+rgba.r+','+rgba.g+','+rgba.b+','+rgba.a+')'}">
            </div>
            <div>             
              <div v-for="(val,key,index) in rgba"><span v-text="key"></span><input type="number" max="255" v-model="rgba[key]"></div>
            </div>
          </div>
          <div class="a-adjust" v-dragX>
            <span :style="spanXstyle"></span>
          </div>
        </div>
			</div>
      <div @click="subColors" class="sub-btn"><span>确定</span></div>
    </div>
  </base-shape>
</template>

<script>
  import baseShape from './baseShape.vue'
  export default {
    name: 'palette',
    data () {
      return {
        rgba:{
          r:0,
          g:0,
          b:0,
          a:0
        },
        spanStyle:{
          top:'-8px',
          right:'-8px'
        },
        spanXstyle:{
          top:'0px',
          left:'-8px'
        },
        parent:null,
        ele:null,
        startX: 0,
        startY: 0,
        moveX: 0,
        moveY: 0,
        offsetX: 0,
        offsetY: 0,
        parentW: 0,
        parentH: 0,
        direction:'XY',
        commonColors:[
          '255,182,193',
          '255,192,203',
          '220,20,60',
          '255,240,245',
          '219,112,147',
          '255,105,180',
          '255,20,147',
          '199,21,133',
          '218,112,214',
          '216,191,216',
          '221,160,221',
          '238,130,238',
          '255,0,255',
          '255,0,255',
          '139,0,139',
          '128,0,128',
          '186,85,211',
          '148,0,211',
          '0,0,0',
          '255,255,255'
        ],
        allColors:[],
        alternateColors:[]
      }
    },

    created () {
      for(let i=0;i<255;i++){
        this.allColors.push({from:i+','+'0,0',to:i+',255,0'})
      }

      for(let i=0;i<255;i++){
        this.alternateColors.push('0,0,'+i)
      }

      this.$store.state.selectColor = this.rgba
    },
    mounted () {
      
    },
    props: {
      data: {
        default: function () {
          return {
            id:'palette',
            style: {
              width: '600px',	
              height: '340px',
              top: '100px',
              left: '100px',
              position: 'absolute',
              zIndex:1000,
              backgroundColor:'rgba(255,255,255,0.2)',
              border:'1px solid #ccc',
              borderRadius:'10px',
							fontSize:'14px',
							color:'black'
            },
            selectType:{}
          }
        }
      },
      index: {
        default: 0
      }
    },
    methods: {
      checkCommonColors (rgb){
        var rgbList = rgb.split(',')
        this.rgba.r = rgbList[0]
        this.rgba.g = rgbList[1]
        this.rgba.b = rgbList[2]
        this.rgba.a = '1'
      },
      subColors(){
        let rgba = this.rgba
        this.$store.state.selectColor = rgba.r+','+rgba.g+','+rgba.b+','+rgba.a
        this.$store.state.selectColorType = false       
      },
      closeColor(){
        this.$store.state.selectColorType = false
        for(let i=0;i<this.$store.state.colorInputTypeList.length-1;i++){
          this.$store.state.colorInputTypeList[i] = false
        } 
      },
      allColorsSelect(e){
        let parent = this.parent.parentNode
        let pTop = parent.offsetTop;
        let pLeft = parent.offsetLeft;
        let mouseX = e.clientX;
        let mouseY = e.clientY;
        this.rgba.r = mouseY - pTop - 31;
        this.rgba.g = mouseX - pLeft - 235
      }, 
      mousedown (dir,e) {
         e.stopPropagation();
        var self = this
        //点击保存初始状态
        self.direction = dir
        this.startY = e.clientY
        this.startX = e.clientX
        this.offsetY = parseInt(this.spanStyle.top)
        this.offsetX = parseInt(this.spanXstyle.left)
        //绑定移动和鼠标up事件
        document.addEventListener('mousemove', self.mousemove)
        document.addEventListener('mouseup', self.mouseup)
      },
      mousemove (e) {
        e.stopPropagation();
        var self = this
        this.moveY = e.clientY - this.startY
        this.moveX = e.clientX - this.startX
        if(self.direction == 'Y'){
          this.spanStyle.top = (this.offsetY+this.moveY)+'px'
          if(256 - parseInt(this.spanStyle.top) < 8){
            this.spanStyle.top = '248px'
          }  
          if(parseInt(this.spanStyle.top) < -8){
            this.spanStyle.top = '-8px'
          }
          this.rgba.b = parseInt(this.spanStyle.top)+8
        }

        if(self.direction == 'X'){
          this.spanXstyle.left = (this.offsetX+this.moveX)+'px'
          if(100 - parseInt(this.spanXstyle.left) < 8){
            this.spanXstyle.left = '92px'
          }  
          if(parseInt(this.spanXstyle.top) < -8){
            this.spanXstyle.left = '-8px'
          }
          this.rgba.a = parseInt(this.spanXstyle.left)+8
        }
            
      },
      mouseup (e) {
        e.stopPropagation();
        var self = this
        //移除移动和鼠标up事件
        document.removeEventListener('mousemove', self.mousemove)
        document.removeEventListener('mouseup', self.mouseup)
      }
    },
    directives: {
      dragY: {
        bind: function (el, binding, vnode) {
          var self = vnode.context
          el.addEventListener('mousedown', self.mousedown.bind(self,"Y"))
        }
      },
      dragX: {
        bind: function (el, binding, vnode) {
          var self = vnode.context
          el.addEventListener('mousedown', self.mousedown.bind(self,"X"))
        }
      },
      dragXY: {
        bind: function (el, binding, vnode) {
          var self = vnode.context
          el.addEventListener('mousedown', self.mousedown.bind(self,"XY"))
        }
      },
      parent:{
        bind(el, binding, vnode){
          var self = vnode.context
          self.parent = el
        }
      }
    },
    components: {baseShape}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .outer-palette{
      width:100%;
      height:100%;
  }
	.title{
		padding:5px 10px;
		overflow:hidden;
	}

	.title > span:nth-child(2){
		font-size:18px;
		float:right;
		transition:all 0.5s
	}

	.title > span:nth-child(2):hover{
		transform: rotate(360deg)
	}

  .select-color-box{
    overflow:hidden;
    padding:8px 5px;
    position:relative;
  }

  .select-color-box:after{
    content:"";
    display:blcok;
    clear:both
    }

  .select-color-box > ul{
    float:left
  }

  .select-color-box > ul:nth-child(1){
    width:200px;
  }

  .select-color-box > ul:nth-child(2){
    width:256px;
    margin:0px 30px
  }

  .select-color-box > ul:nth-child(3){
    position:relative;
    width:20px;
    margin:0px 20px;
    height:256px;
    background:linear-gradient(rgb(0,0,0),rgb(0,0,255));
    overflow:visible;
  }

  .select-color-box > ul:nth-child(3) > span{
    position:absolute;
    height:0px;
    width:0px;
    border:8px solid transparent;
    border-right: 8px solid black;
  }
  .select-color-box > ul:nth-child(1) > li{
    float:left;
    width:20%;
    height:25px;
    margin:3px 0;
    padding:5px 5px;
    box-sizing:border-box
  }

  .select-color-box > ul:nth-child(2) > li{
    height:1.00px;
    width:100%;
    box-sizing:border-box;
    cursor:crosshair
  }

  .select-color-box > ul:nth-child(1) > li >span{
    float:left;
    width:100%;
    height:100%; 
    border-style: inset;
  }

  .color-show-box{
    position:absolute;
    left:5px;
    bottom:10px;
  }

  .color-show-box-top{
    overflow:hidden;
    padding:0 5px;
  }

  .color-show-box > div:nth-child(2){
    width:100px;
    height:16px;
    background: linear-gradient(to right, rgba(0,0,0,0) , rgba(0,0,0,1));
    border:1px solid black;
    margin:0 auto;
    position:relative;
    overflow:visible
  }

  .color-show-box-top > div{
    float:left;
  }

  .color-show-box-top > div:nth-child(1){
    width:50px;
    height:100px;
  }


  .color-show-box-top > div:nth-child(2) input{
    width:50px;
    height:20px;
    text-align:center;
    margin:1px 0;
  }

  .color-show-box-top > div:nth-child(2) span{
    display:inline-block;
    width:50px;
    text-align:center;
  }

  .a-adjust > span{
    position:absolute;
    height:16px;
    width:16px;
    border-radius:50%;
    background:rgba(255,105,105,0.7)
  }

  .sub-btn{
    text-align:center;
    margin-top:10px;
  }

  .sub-btn > span{
    padding:5px 10px;
    line-height:1;
    background:#42b983;
    border-radius:4px;
    color:white
  }
</style>
