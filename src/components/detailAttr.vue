<template>
  <div class="detail-attr">
    <ul v-for="(val,key,index) in attribute" :key="key" v-if="val.active">
      <li v-for="(v,k,i) in val" :key="k" v-if="v.visible">
        <span v-text="k+':'"></span><self-input :data="v" :styleObj="v.type=='textarea'?textareaStyle:''"></self-input>
      </li>
    </ul>
  </div>
</template>

<script>
  import selfInput from './selfInput.vue'
  export default {
    name: 'detailAttr',
    data () {
      return {
        textareaStyle:{
          minHeight:'200px',
          width:'300px',
          overflow:'auto'
        }
      }
    },

    created () {
    },
    mounted () {

    },
    props: {
      attribute: {
        default(){
          return {
            width: '50px',
            height: '10px'
          }
        }
      }
    },
    methods: {},
    directives: {},
    components: {selfInput}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .detail-attr > ul {
    border-top: 1px solid #cccccc;
    padding-top: 8px;
    height: 240px;
    overflow-y: auto;
  }

  .detail-attr > ul > li {
    padding: 8px 0;
  }

  .detail-attr > ul > li:after {
    display: block;
    clear: both;
    content: '';
  }

  span, input {
    float: left;
  }

  .detail-attr > ul > li > span {
    width: 120px;
    text-align: right;
    padding-right: 20px;
  }

  .detail-attr > ul > li > input {
    border: none;
    border-bottom: 1px solid #cccccc;
    background-color: transparent;
    padding-left: 3px;
    width: 300px;
    text-align: center;
  }
</style>
