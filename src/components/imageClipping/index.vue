<template>
    <div class="clipping-box">
      <div class="cut-box">
				<div class="out-img-box" :style="outImgstyle">
					<img :src="imgSrc" class="clip-img" v-show="imgSrc" v-img :style="imgStyle" @load="fitImg">
					<base-shape :baseData="moveData" :select="1" v-show="imgSrc">
						<div slot="append" class="move-shape">
							
						</div>
					</base-shape>
				</div>
      </div>
			<input type="file" @change="readImg($event)" class="btn-select">
      <canvas :width="canvasStyle.width" :height="canvasStyle.height" v-canvas class="canvasImg"></canvas>      
      <button @click="commitCanvas($event)" class="btn-confirm">确定</button>
			<button @click = "upImg" class="btn-submit">提交</button> 
    </div>      
</template>

<script>
	import axios from 'axios'
  import baseShape from "../baseShape.vue"
  export default {
    name: 'imageClipping',
    data () {
      return {
        img:null,
        canvas:null,
        imgSrc:"",
				outImgstyle:{
					width:'',
					height:''
				},
				imgStyle:{
					width:'',
					height:''
				},
        canvasStyle:{
          width:'0px',
          height:'0px'
        },
        moveData:{
          style:{
            width:'200px',
            height:'200px',
            top:'100px',
            left:'100px'
          },
          selectType:{}
          }
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
           
          }
        }
      }
    },
    methods: {
			fitImg(){
				let self = this
				let imgW = self.img.offsetWidth
				let imgH = self.img.offsetHeight
				if(imgH > imgW){
					if(imgH > 400){
						self.imgStyle.height = '100%';
						let imgW = self.img.offsetWidth
						self.outImgstyle.height = '100%'
						self.outImgstyle.width = imgW + 'px'
						if(imgW < 200){
							self.moveData.style.top =  '0px'
							self.moveData.style.left = '0px'
							self.moveData.style.width = imgW + 'px'
						}		
					}else{
						let imgW = self.img.offsetWidth
						let imgH = self.img.offsetHeight
						self.outImgstyle.width = imgW + 'px'
						self.outImgstyle.height = imgH + 'px'
						if(imgW < 200){
							self.moveData.style.top =  '0px'
							self.moveData.style.left = '0px'
							self.moveData.style.width = imgW + 'px'
						}
						if(imgH < 200){
							self.moveData.style.top =  '0px'
							self.moveData.style.left = '0px'
							self.moveData.style.width = imgH + 'px'
						}
					}	
				}else{
					if(imgW > 400){
						self.imgStyle.width = '100%';
						let imgH = self.img.offsetHeight
						self.outImgstyle.width = '100%'
						if(imgH > 400){
							self.outImgstyle.height = '100%'
						}else{
							self.outImgstyle.height = imgH + 'px'
						}
						if(imgH < 200){
							self.moveData.style.top =  '0px'
							self.moveData.style.left = '0px'
							self.moveData.style.height = imgH + 'px'
						}	
					}else{
						let imgW = self.img.offsetWidth
						let imgH = self.img.offsetHeight
						self.outImgstyle.width = imgW + 'px'
						self.outImgstyle.height = imgH + 'px'
						if(imgW < 200){
							self.moveData.style.top =  '0px'
							self.moveData.style.left = '0px'
							self.moveData.style.width = imgW + 'px'
						}
						if(imgH < 200){
							self.moveData.style.top =  '0px'
							self.moveData.style.left = '0px'
							self.moveData.style.height = imgH + 'px'
						}
					}
				}
			},
    	readImg(e){
				var self = this
				self.imgStyle.height = ''
				self.imgStyle.width = ''
				let file = e.target.files[0]
				let reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function(){
					let url = reader.result
					self.imgSrc = url
				}				
      },
      commitCanvas(e){
				let self = this
				let imgStyle = self.moveData.style
				let imgW = self.img.offsetWidth
				let imgH = self.img.offsetHeight
				var ctx = self.canvas.getContext('2d');
				var img = new Image();
				self.canvasStyle.width = parseInt(imgStyle.width)
				self.canvasStyle.height = parseInt(imgStyle.height)
				ctx.clearRect(0,0,self.canvasStyle.width,self.canvasStyle.height);
				img.onload = function(){
					ctx.drawImage(img, 0-parseInt(imgStyle.left),0-parseInt(imgStyle.top),imgW,imgH)
				}  	
				img.src = self.img.src
      },
			canvasToUrl(){
				let self = this
				let data=self.canvas.toDataURL();

				// dataURL 的格式为 “data:image/png;base64,****”,逗号之前都是一些说明性的文字，我们只需要逗号之后的就行了
				data=data.split(',')[1];
				data=window.atob(data);
				let ia = new Uint8Array(data.length);
				for (var i = 0; i < data.length; i++) {
						ia[i] = data.charCodeAt(i);
				};

				// canvas.toDataURL 返回的默认格式就是 image/png
				let blob=new Blob([ia], {type:"image/png"});
				if(blob.size > 10 *1024){
					window.alert("图片过大，图片应该小于10K")
					return 0
				}	
				// blob = new File([blob],Math.random()+'.png')
				var fd=new FormData();
				fd.append('file',blob);
				return fd;	
			},
			upImg(){
				let self = this;
				let form = self.canvasToUrl();
				if(!form){
					return
				}
				// 进度条监控
				// let xhr = new XMLHttpRequest()
				// xhr.onprogress = function(e){
				// 	console.log(e)
				// }
				// xhr.open('POST', '/file/imgupload', true);
				// xhr.send(form);
				axios.post('/file/imgupload', form).then(function (res) {
					self.$emit('imgUrl',res)
        }).catch(function (err) {
        })
			}
    },
     directives: {
      img: {
        bind: function (el, binding, vnode) {
          var self = vnode.context
          self.img = el;
        }
      },
			canvas: {
        bind: function (el, binding, vnode) {
          var self = vnode.context
          self.canvas = el;
        }
      }
    },
    components: {baseShape}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .clipping-box{
		width:100%;
		height:100%;
		position:relative;
	}
  .cut-box{
    width:400px;
    height:400px;
    position:absolute;
		text-align:center;
		line-height:normal;
		top:10px;
		left:10px;
		border:1px solid green
  }

  .clip-img{
		vertical-align:middle
  }

  .move-shape{
    width:100%;
    height:100%;
    border:1px solid red;
    box-sizing:border-box;
  }

	.out-img-box{
		position:absolute;
		top:0;
		right:0;
		bottom:0;
		left:0;
		margin:auto auto;
	}
	.canvasImg{
		position:absolute;
		top:10px;
		left:420px;
	}

	.btn-select{
		position:absolute;
		left:10px;
		top:440px;
	}

	.btn-select{
		position:absolute;
		left:10px;
		top:440px;
	}

	.btn-confirm{
		position:absolute;
		left:350px;
		top:440px;
	}

	.btn-submit{
		position:absolute;
		left:600px;
		top:440px;
	}
</style>
