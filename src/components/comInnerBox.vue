<template>
  <transition name="com-fade">
    <ul class="components-box" v-if="type">
      <li v-for="val in componentsList" @click="appendEle(val.type,$event)">
        <i :class="val.icon"></i>
        <span v-text="val.name"></span>
      </li>
    </ul>
  </transition>
</template>

<script>
  import {common} from '../common/common.js'
  export default {
    name: 'App',
    data (){
      return {}
    },
    props: {
      componentsList: {
        default(){
          return [
            {icon: 'icon iconfont icon-tupian', name: '图片', type: 'image'},
            {icon: 'icon iconfont icon-wenzi', name: '文字', type: 'text'},
            {icon: 'icon iconfont icon-tubiaobingzhuangtu',name:'饼状图',type:'pieChart'},
            {icon: 'icon iconfont icon-tubiaozhuzhuangtu',name:'柱状图',type:'histogram'},
          ]
        }
      },
      type: {
        default: false
      }
    },
    methods: {
      appendEle(type,e){
        e.stopPropagation()
        this.$store.state.id++
        switch (type) {
          case 'image':
            var image = common.assign({id:this.$store.state.id},this.$store.state.defEleData.image)
            this.$store.state.data.imageList.push(image)
            break;
          case 'text':
            var text = common.assign({id:this.$store.state.id},this.$store.state.defEleData.text)
            this.$store.state.data.textList.push(text)
            break;
          case 'pieChart':
            var pieChart = common.assign({id:this.$store.state.id},this.$store.state.defEleData.pieChart)
            this.$store.state.data.pieChartList.push(pieChart)
            break;
          case 'histogram':
            var histogram = common.assign({id:this.$store.state.id},this.$store.state.defEleData.histogram)
            this.$store.state.data.histogramList.push(histogram)
            break;
        }
      }
    }
  }

</script>

<style scoped>
  .components-box {
    padding: 5px 0;
    top: 0;
    right: -61px;
    width: 60px;
    position: absolute;
    color: #cccccc;
    background: #444444;
  }

  .components-box > li {
    padding: 3px 0;
  }

  .components-box:after {
    display: block;
    position: absolute;
    width: 0px;
    height: 0px;
    border: 10px solid transparent;
    border-right: 10px solid #ffffff;
    box-sizing: border-box;
    left: -20px;
    top: 10px;
    content: '';
  }

  .components-box > li > span {
    display: block;
    font-size: 14px;
  }

  .components-box > li > i {
    font-size: 16px;
  }

  .com-fade-enter-active {
    transform: rotateY(360deg);
    transition: all .5s;
    opacity: 1;
  }

  .com-fade-leave-active {
    transform: rotate(0deg);
    transition: all .5s;
    opacity: 1;
  }

  .com-fade-enter {
    opacity: 0;
    transform: rotate(0deg);
  }

  .com-fade-leave-to {
    opacity: 0;
    transform: rotateY(360deg);
  }
</style>

