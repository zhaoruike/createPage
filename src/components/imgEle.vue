<template>
  <base-shape :index="index" :baseData="data" :select="2">
    <div slot="append" v-on:dblclick="changeProType(1,$event)">
      <img :src="data.address" alt="img" ondragStart="return false">
      <property-box v-if="propertyType" @closeProType="changeProType" :attribute="data.attribute" @upDataEle="changeEle"></property-box>
    </div>
  </base-shape>
</template>

<script>
  import baseShape from './baseShape.vue'
  import propertyBox from './propertyBox.vue'
  export default {
    name: 'imgEle',
    data () {
      return {
        propertyType: false
      }
    },

    created () {
    },
    mounted () {

    },
    props: {
      data: {
        default: function () {
          return {
            style: {
              width: '316px',
              height: '132px',
              top: '0px',
              left: '0px',
              position: 'absolute'
            },
            type: 'image',
            address: 'http://cp.itolddriver.com/images/def.jpg'
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
