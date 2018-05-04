<template>
  <div class="property-box">
    <div class="property-inner-box">
      <span class="close-btn" v-on:click="changeProType($event)">×</span>
      <h3></h3>
      <ul class="property-inner-list">
        <li :style="itemStyle" v-for="(val,key,index) in attribute" :key="key" v-on:click="checkAttrItem(key)">
          <div v-text="key" :class="val.active?'property-item-active':''" class="item-inner"></div>
        </li>
      </ul>
      <detail-attr :attribute="attribute"></detail-attr>
      <div class="submit-btn" v-on:click="upDataEle($event)">确定</div>
    </div>
  </div>
</template>

<script>
  import detailAttr from './detailAttr.vue'
  export default {
    name: 'propertyBox',
    data () {
      return {}
    },

    created () {
    },
    mounted () {

    },
    props: {
      attribute: {
        default(){
          return {
            title: '图片',
            itemData: {
              'base': {
                width: '50px',
                height: '10px'
              }
            },

          }
        }
      },
      itemStyle: {
        default() {
          return {
            width: '20%'
          }
        }
      },
      index: {
        default: 0
      }
    },
    methods: {
      changeProType(e){
        this.$emit('closeProType', 0, e)
      },
      checkAttrItem(key){
        let attribute = this.attribute
        for (let attr in attribute) {
          if (attribute.hasOwnProperty(attr)) {
            if (attr == key) {
              attribute[attr].active = true
            } else {
              attribute[attr].active = false
            }
          }
        }
      },
      upDataEle(e){
        this.$emit('upDataEle', this.attribute, e)
      }
    },
    directives: {},
    components: {detailAttr}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .property-box {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0
  }

  .property-inner-box {
    width: 500px;
    height: 300px;
    border: 1px solid #dcdcdc;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: whitesmoke;
    padding: 15px 10px;
    border-radius: 4px;
  }

  .close-btn {
    font-size: 16px;
    color: #666666;
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: default;
  }

  .property-inner-list:after {
    display: block;
    clear: both;
    content: "";
  }

  .property-inner-list {
    width: 100%;
    overflow: hidden;
  }

  .property-inner-list > li {
    float: left;
    font-size: 16px;
    padding: 0px 2px;
    line-height: 1;
    text-align: center;
  }

  .item-inner {
    margin: 0 2px;
    padding: 2px 0;
    border-radius: 4px 4px 0 0;
  }

  .submit-btn {
    width: 60px;
    padding: 1px 0;
    color: white;
    background: #cccccc;
    border: 1px solid burlywood;
    border-radius: 5px;
    margin: 0 auto;
    text-align: center;
  }

  .submit-btn:hover {
    color: #56a8ec;
  }
</style>
