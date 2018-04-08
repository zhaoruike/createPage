<template>
  <base-shape :baseData="data">
    <div slot="append">
      <p v-text="data.content" v-on:dblclick="changeProType(1,$event)"></p>
      <property-box v-if="propertyType" v-on:closeProType="changeProType" :attribute="data.attribute" @upDataEle="changeEle"></property-box>
    </div>
  </base-shape>
</template>

<script>
  import baseShape from './baseShape.vue'
  import propertyBox from './propertyBox.vue'
  export default {
    name: 'textEle',
    data () {
      return {
        propertyType: false
      }
    },

    create () {
    },
    mounted () {

    },
    props: {
      data: {
        default: function () {
          return {
            style: {
              width: '100px',
              height: 'auto',
              top: '0px',
              left: '0px',
              position: 'absolute'
            },
            type: 'text',
            content: '鞋子'
          }
        }
      },
      index: {
        default: 0
      }
    },
    methods: {
      changeProType(type, e){
        e.stopPropagation()
        if (parseInt(type)) {
          this.propertyType = true
        }
        if (!parseInt(type)) {
          this.propertyType = false
        }
      },
      changeEle(msg, e){
        var self = this
        for (let attr in msg) {
          if (msg.hasOwnProperty(attr)) {
            if (attr == 'style') {
              for (let att in msg[attr]) {
                if (msg[attr][att].value !== self.data[attr][att]) {
                  self.data[attr][att] = msg[attr][att].value
                }
              }
            }
            if (attr == 'content') {
              for (let att in msg[attr]) {
                if (msg[attr][att] !== self.data[att]) {
                  self.data[att] = msg[attr][att].value
                }
              }
            }
          }
        }
        this.changeProType(msg, e)
      }
    },
    directives: {},
    components: {baseShape, propertyBox}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
