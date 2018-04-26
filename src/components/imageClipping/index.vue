<template>
    <div>
      <input type="file" @change="readImg($event)">
      <div class="cut-box">
        <img :src="imgSrc" class="clip-img" v-show="imgSrc">
        <base-shape :baseData="moveData" :select="1" v-show="imgSrc">
          <div slot="append" class="move-shape">
            
          </div>
        </base-shape>
      </div>      
      <button>确定</button> 
    </div>      
</template>

<script>
  import baseShape from "../baseShape.vue"
  export default {
    name: 'imageClipping',
    data () {
      return {
       imgSrc:"",
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
    	readImg(e){
				var self = this
				let file = e.target.files[0]
				let reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function(){
					let url = reader.result
					self.imgSrc = url
				}
      }
    },
    directives: {},
    components: {baseShape}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .cut-box{
    width:400px;
    height:400px;
    position:relative
  }

  .clip-img{
    width:100%;
    height:100%;
  }

  .move-shape{
    width:100%;
    height:100%;
    border:1px solid red;
    box-sizing:border-box;
  }
</style>
