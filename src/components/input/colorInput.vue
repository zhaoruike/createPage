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
    },
    mounted () {
      
    },
    watch:{
			'$store.state.selectColor':function(val){
        console.log(this.data)
				if(this.$store.state.colorInputTypeList[this.id]){
					this.data.value = 'rgba('+val+')'
					this.styleObj.background = this.data.value									
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
            value:'rgba(255,0,0,1)'
          }
        }
      },
      styleObj:{
          default(){
              return {
              height:'25px',
              width:'150px',
              background:this.data.value
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
