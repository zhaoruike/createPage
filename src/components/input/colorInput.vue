<template>  
    <div :style="styleObj" @click="showPalette">  
    </div>
</template>

<script>

  export default {
    name: 'colorInput',
    data () {
      return {
       id:0
      }
    },
    created () {
		  this.color = this.$store.state.selectColor
			this.$store.state.colorInputTypeList.push(false)
			this.id = this.$store.state.colorInputTypeList.length-1
			console.log(this.$store.state.colorInputTypeList)
    },
    mounted () {
      
    },
    watch:{
			'$store.state.selectColor':function(val){
				if(this.$store.state.colorInputTypeList[this.id]){
					this.data.color = val
					this.styleObj.background = 'rgba('+this.data.color+')'									
				}
				for(let i=0;i<this.$store.state.colorInputTypeList.length-1;i++){
          this.$store.state.colorInputTypeList[i] = false
        }
			}
    },
    props: {
      data: {
        default: function () {
          return {
            color:'0,0,0,0'
          }
        }
      },
      styleObj:{
          default(){
              return {
              height:'25px',
              width:'150px',
              background:'rgba('+this.data.color+')'
              }
            }
      }
    },
    methods: {
			showPalette(){
				var self = this
				this.$store.state.selectColorType = true
				this.$store.state.colorInputTypeList.forEach(function(item,index){
          item = false
        })
				this.$store.state.colorInputTypeList[self.id] = true
			}
    },
    directives: {},
    components: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
