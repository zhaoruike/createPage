<template>  
    <div class="self-input-box" >
    	<input :type="data.type" v-if="data.type!=='textarea'&&data.type!=='select'&&data.type!=='color'&&data.type!=='date'" v-model="data.value">
			<textarea-input v-if="data.type=='textarea'" :data="data" :styleObj="styleObj"></textarea-input>
			<select-input v-if="data.type=='select'" :data="data"></select-input>
      <color-input v-if="data.type == 'color'" :data="data"></color-input>
      <date-input v-if="data.type == 'date'" :data="data"></date-input>
    </div>
</template>

<script>
  import textareaInput from './input/textareaInput.vue'
  import selectInput from './input/selectInput.vue'
  import colorInput from './input/colorInput.vue'
  import dateInput from './input/dateInput.vue'
  export default {
    name: 'selfInput',
    data () {
      return {
       
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
    components: {textareaInput,selectInput,colorInput,dateInput}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .self-input-box{
      display:inline-block;
      min-width:150px;
      box-sizing:border-box;
  }
</style>
