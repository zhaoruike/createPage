<template>
  <div v-drag :id="'base'+baseData.id" :style="baseData.style" :index="index" :class="baseData.selectType.single||baseData.selectType.multiple?'select-ele':''" class="base-shape">
    <slot name="append"></slot>
    <move-shape :direction="'down'" :parent="parent" :parentData="baseData" v-if="select" :select="select"></move-shape>
    <move-shape :direction="'right'" :parent="parent" :parentData="baseData" v-if="select" :select="select"></move-shape>
    <move-shape :direction="'up'" :parent="parent" :parentData="baseData" v-if="select" :select="select"></move-shape>
    <move-shape :direction="'left'" :parent="parent" :parentData="baseData" v-if="select" :select="select"></move-shape>
    <move-shape :direction="'n-w'" :parent="parent" :parentData="baseData" v-if="select" :select="select"></move-shape>
    <move-shape :direction="'n-e'" :parent="parent" :parentData="baseData" v-if="select" :select="select"></move-shape>
    <move-shape :direction="'s-w'" :parent="parent" :parentData="baseData" v-if="select" :select="select"></move-shape>
    <move-shape :direction="'s-e'" :parent="parent" :parentData="baseData" v-if="select" :select="select"></move-shape>
  </div>
</template>

<script>
  import moveShape from './moveShape.vue'
  export default {
    name: 'baseShape',
    data () {
      return {
//        styleObj: {
//          position: 'absolute',
//          backgroundColor: 'red',
//          width: '100px',
//          height: '100px'
//        },
        ele: null,
        startX: 0,
        startY: 0,
        moveX: 0,
        moveY: 0,
        offsetX: 0,
        offsetY: 0,
        parentW: 0,
        parentH: 0
      }
    },

    created () {
    },
    mounted () {
      let self = this
      let scroll = self.ele.parentNode.parentNode
      let top = scroll.offsetTop
      top ?  top=-top+'px':top='0px'
      if(self.baseData.attribute){
        self.baseData.style.top = top
        self.baseData.attribute.style.top.value = top
      }
    },
    props: {
      parent: {
        default: 'parent'
      },
      baseData: {
        default(){
          return {
            styleObj: {},
            selectType: {}
          }
        }
      },
      index: {
        default: 0
      },
      select:{
        default:true
      }
    },
    methods: {
      mousedown (e) {
        var self = this
        //处理多选拖动与单个拖动判断
        //判断是否参加多选
        if(self.select == 2){
          for (let attr in self.$store.state.data) {
            if (self.$store.state.data.hasOwnProperty(attr)) {
              if (self.$store.state.data[attr].length) {
                self.$store.state.data[attr].forEach(function (item, index) {
                  item.selectType.single = false
                })
              }
            }
          }
          let pushMark = 0
          this.$store.state.ctrlMoveList.forEach(function (item, index) {
            if (item.data.type == self.baseData.type) {
              if (item.index == self.index) {
                pushMark += (index + 1)
              }
            }
          })
          if (e.ctrlKey && e.button == 0) {
            if (!pushMark) {
              self.baseData.selectType.multiple = true
              self.baseData.selectType.single = false
              this.$store.state.ctrlMoveList.push({data: self.baseData, index: self.index})
            } else {
              self.baseData.selectType.multiple = false
              self.baseData.selectType.single = false
              this.$store.state.ctrlMoveList.splice((pushMark - 1), 1)
            }
          } else {
            if (!pushMark) {
              this.$store.state.ctrlMoveList.forEach(function (item, index) {
                item.data.selectType.multiple = false
                item.data.selectType.single = false
              })
              this.$store.state.ctrlMoveList.splice(0, this.$store.state.ctrlMoveList.length)
            }
            self.baseData.selectType.single = true
          }
        }
        
        //点击保存初始状态
        this.startX = e.clientX
        this.startY = e.clientY
        this.offsetX = this.ele.offsetLeft
        this.offsetY = this.ele.offsetTop
        if(self.select == 2){
          this.$store.state.ctrlMoveList.forEach(function (item, index) {
            item.data.startX = parseInt(item.data.style.left)
            item.data.startY = parseInt(item.data.style.top)
          })
        }
        switch (this.parent) {
          case 'body':
            this.parentW = document.getElementsByTagName('body')[0].clientWidth
            this.parentH = document.getElementsByTagName('body')[0].clientHeight
            break;
          case 'parent':
            this.parentW = this.ele.parentNode.clientWidth
            this.parentH = this.ele.parentNode.clientHeight
            break;
        }
        //绑定移动和鼠标up事件
        document.addEventListener('mousemove', self.mousemove)
        document.addEventListener('mouseup', self.mouseup)
      },
      mousemove (e) {
        var self = this
        let left = this.moveX + this.offsetX
        let top = this.moveY + this.offsetY
        let leftMark = 0
        let topMark = 0
        let moveMark = true
        this.moveX = e.clientX - this.startX
        this.moveY = e.clientY - this.startY
        //移动赋值
        this.baseData.style.left = this.moveX + this.offsetX + 'px'
        this.baseData.style.top = this.moveY + this.offsetY + 'px'
        //越界判断
        if (left < 1) {
          this.baseData.style.left = '0px'
          leftMark += 1
        }
        if (left > this.parentW - this.ele.clientWidth) {
          this.baseData.style.left = (this.parentW - this.ele.clientWidth) + 'px'
          leftMark += 1
        }
        if (top < 1) {
          this.baseData.style.top = '0px'
          topMark += 1
        }
        if (top > this.parentH - this.ele.clientHeight) {
          this.baseData.style.top = (this.parentH - this.ele.clientHeight) + 'px'
          topMark += 1
        }
        if(self.select == 2){
          this.baseData.attribute.style.left.value = this.baseData.style.left
          this.baseData.attribute.style.top.value = this.baseData.style.top
        }

        //多选拖动
        //判断是否参加多选
        if(self.select == 2){
          this.$store.state.ctrlMoveList.forEach(function (item, index) {
            moveMark = true
            if (item.data.type == self.baseData.type) {
              if (item.index == self.index) {
                moveMark = false
              }
            }
            if (!leftMark && moveMark) {
              item.data.style.left = (item.data.startX + self.moveX) + 'px'
            }
            if (!topMark && moveMark) {
              item.data.style.top = (item.data.startY + self.moveY) + 'px'
            }
            item.data.attribute.style.left.value = item.data.style.left
            item.data.attribute.style.top.value = item.data.style.top
          })
        }
        
      },
      mouseup (e) {
        var self = this
        //移除移动和鼠标up事件
        document.removeEventListener('mousemove', self.mousemove)
        document.removeEventListener('mouseup', self.mouseup)
      }
    },
    directives: {
      drag: {
        bind: function (el, binding, vnode) {
          var self = vnode.context
          self.ele = el;
          self.ele.addEventListener('mousedown', self.mousedown)
        }
      }
    },
    components: {moveShape}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .base-shape{
    position:absolute
  }
</style>
