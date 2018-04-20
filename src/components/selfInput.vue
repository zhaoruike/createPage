<template>  
    <div class="self-input-box">
    	<input :type="data.type" v-if="data.type!=='textarea'&&data.type!=='select'">
			<textarea-input v-if="data.type=='textarea'"></textarea-input>
			<select-input v-if="data.type=='select'"></select-input>
    </div>
</template>

<script>
  import textareaInput from './input/textareaInput.vue'
  import selectInput from './input/selectInput.vue'
  export default {
    name: 'selfInput',
    data () {
      return {
       
      }
    },
    create () {
    },
    mounted () {
      
    },
    watch:{
    },
    props: {
      data:{
        default(){
          return{
            type:'text',
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
    },
    directives: {},
    components: {textareaInput,selectInput}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .self-input-box{
      display:inline-block
  }
</style>
