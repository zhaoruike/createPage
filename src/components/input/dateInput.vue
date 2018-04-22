<template>
  <div>
   <div v-text="showDate"></div>
	</div>
</template>

<script>
	import {common} from '../../common/common.js'
	export default {
		data () {
			return {
        showDate:''
			}
		},
		created () {
      this.showDate = common.formDate('yyyy-MM-dd',new Date())
		},
		mounted () {

		},
		props :{
			data:{
				default(){
					return{
						defDate:new Date().getTime(),
						format:"yyyy-MM-dd",
						backValue: common.formDate('yyyy-MM-dd',new Date().getTime())
					}
				}
			}
		},
		methods:{},
	  directives:{},
		components:{},
		destoryed (){}	
	}
</script>

<style scoped>

</style>