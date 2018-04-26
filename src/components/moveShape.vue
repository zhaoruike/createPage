<template>
  <div v-drag :style="styleObj">
  </div>
</template>

<script>
  export default {
    name: 'moveShape',
    data () {
      return {
        styleObj: {
          position: 'absolute',
          height: '100%',
          width: '100%',
          bottom: '',
          right: '',
          top: '',
          left: '',
          border: '0px solid black',
          cursor: 's-resize'
        },
        innerDirection: '',
        ele: null,
        startX: 0,
        startY: 0,
        moveX: 0,
        moveY: 0,
        parentW: 0,
        parentH: 0,
        parentX: 0,
        parentY: 0,
        limitX: 0,
        limitY: 0
      }
    },
    created () {

    },
    props: {
      direction: {
        default: 'down'
      },
      parent: {
        default: 'body'
      },
      parentData:{
        default(){
           return {}
        }
      },
      select:{
        default:2
      },
    },
    watch: {},
    methods: {
      mousedown (e) {
        var self = this
        e.stopPropagation()
        this.startX = e.clientX
        this.startY = e.clientY
        this.parentX = this.ele.parentNode.offsetLeft
        this.parentY = this.ele.parentNode.offsetTop
        this.parentH = this.ele.parentNode.clientHeight
        this.parentW = this.ele.parentNode.clientWidth
        switch (this.parent) {
          case 'body':
            this.limitX = document.getElementsByTagName('body')[0].clientWidth
            this.limitY = document.getElementsByTagName('body')[0].clientHeight
            break;
          case 'parent':
            this.limitX = this.ele.parentNode.parentNode.clientWidth
            this.limitY = this.ele.parentNode.parentNode.clientHeight
            break;
        }
        document.addEventListener('mousemove', self.mousemove)
        document.addEventListener('mouseup', self.mouseup)
      },
      mousemove (e) {
        var self = this
        e.stopPropagation()
        self.moveY = e.clientY - self.startY
        self.moveX = e.clientX - self.startX
        switch (self.direction) {
          case 'down':
            if (self.parentH + self.moveY + self.parentY <= self.limitY) {
              self.parentData.style.height = self.parentH + self.moveY + 'px'
              if(self.select == 2){
                self.parentData.attribute.style.height.value = self.parentH + self.moveY + 'px'
              }
            }
            break;
          case 'up':
            if (0 - self.moveY <= self.parentY) {
              self.parentData.style.height = self.parentH - self.moveY + 'px'             
              self.parentData.style.top = self.parentY + self.moveY + 'px'
              if(self.select == 2){
                self.parentData.attribute.style.height.value = self.parentH - self.moveY + 'px'
                self.parentData.attribute.style.top.value = self.parentY + self.moveY + 'px'
              }             
            }
            break;
          case 'left':
            if (0 - self.moveX <= self.parentX) {
              self.parentData.style.width = self.parentW - self.moveX + 'px' 
              self.parentData.style.left = self.parentX + self.moveX + 'px'
              if(self.select == 2){
              self.parentData.attribute.style.width.value = self.parentW - self.moveX + 'px'
              self.parentData.attribute.style.left.value = self.parentX + self.moveX + 'px'
              }
            }
            break;
          case 'right':
            if (self.parentW + self.moveX + self.parentX <= self.limitX){
              self.parentData.style.width = self.parentW + self.moveX + 'px'
              if(self.select == 2){
              self.parentData.attribute.style.width.value = self.parentW + self.moveX + 'px'
              }
            }
            break;
          case 'n-w':
            if (0 - self.moveY <= self.parentY) {
              self.parentData.style.height = self.parentH - self.moveY + 'px'
              self.parentData.style.top = self.parentY + self.moveY + 'px'
              if(self.select == 2){
              self.parentData.attribute.style.height.value = self.parentH - self.moveY + 'px'
              self.parentData.attribute.style.top.value = self.parentY + self.moveY + 'px'
              }
            }
            if (0 - self.moveX <= self.parentX) {
              self.parentData.style.width = self.parentW - self.moveX + 'px'
              self.parentData.style.left = self.parentX + self.moveX + 'px'
              if(self.select == 2){
              self.parentData.attribute.style.width.value = self.parentW - self.moveX + 'px'
              self.parentData.attribute.style.left.value = self.parentX + self.moveX + 'px'
              }
            }
            break;
          case 'n-e':
            if (0 - self.moveY <= self.parentY) {
              self.parentData.style.height = self.parentH - self.moveY + 'px'
              self.parentData.style.top = self.parentY + self.moveY + 'px'
              if(self.select == 2){
              self.parentData.attribute.style.height.value = self.parentH - self.moveY + 'px'
              self.parentData.attribute.style.top.value = self.parentY + self.moveY + 'px'
              }
            }
            if (self.parentW + self.moveX + self.parentX <= self.limitX){
              self.parentData.style.width = self.parentW + self.moveX + 'px'
              if(self.select == 2){
              self.parentData.attribute.style.width.value = self.parentW + self.moveX + 'px'
              }
            }
            break;
          case 's-w':
            if (self.parentH + self.moveY + self.parentY <= self.limitY) {
               self.parentData.style.height = self.parentH + self.moveY + 'px'
               if(self.select == 2){
                self.parentData.attribute.style.height.value = self.parentH + self.moveY + 'px'
               }
            }
            if (0 - self.moveX <= self.parentX) {
             self.parentData.style.width = self.parentW - self.moveX + 'px'
              self.parentData.style.left = self.parentX + self.moveX + 'px'
              if(self.select == 2){
              self.parentData.attribute.style.width.value = self.parentW - self.moveX + 'px'
              self.parentData.attribute.style.left.value = self.parentX + self.moveX + 'px'
              }
            }
            break;
          case 's-e':
            if (self.parentH + self.moveY + self.parentY <= self.limitY) {
              self.parentData.style.height = self.parentH + self.moveY + 'px'
              if(self.select == 2){
              self.parentData.attribute.style.height.value = self.parentH + self.moveY + 'px'
              }
            }
            if (self.parentW + self.moveX + self.parentX <= self.limitX){
              self.parentData.style.width = self.parentW + self.moveX + 'px'
              if(self.select == 2){
              self.parentData.attribute.style.width.value = self.parentW + self.moveX + 'px'
              }
            }
            break;
        }
      },
      mouseup (e) {
        var self = this
        document.removeEventListener('mousemove', self.mousemove)
        document.removeEventListener('mouseup', self.mouseup)
      }
    },
    directives: {
      drag: {
        bind: function (el, binding, vnode) {
          var self = vnode.context
          self.ele = el;
          switch (self.direction) {
            case 'down':
              self.styleObj.width = '100%'
              self.styleObj.height = '5px'
              self.styleObj.bottom = '0'
              self.styleObj.right = '0'
              self.styleObj.cursor = 's-resize'
              break;
            case 'up':
              self.styleObj.width = '100%'
              self.styleObj.height = '5px'
              self.styleObj.top = '0'
              self.styleObj.right = '0'
              self.styleObj.cursor = 's-resize'
              break;
            case 'left':
              self.styleObj.height = '100%'
              self.styleObj.width = '5px'
              self.styleObj.bottom = '0'
              self.styleObj.left = '0'
              self.styleObj.cursor = 'e-resize'
              break;
            case 'right':
              self.styleObj.height = '100%'
              self.styleObj.width = '5px'
              self.styleObj.bottom = '0'
              self.styleObj.right = '0'
              self.styleObj.cursor = 'e-resize'
              break;
            case 'n-w':
              self.styleObj.height = '5px'
              self.styleObj.width = '5px'
              self.styleObj.top = '0'
              self.styleObj.left = '0'
              self.styleObj.cursor = 'se-resize'
              break;
            case 'n-e':
              self.styleObj.height = '5px'
              self.styleObj.width = '5px'
              self.styleObj.top = '0'
              self.styleObj.right = '0'
              self.styleObj.cursor = 'ne-resize'
              break;
            case 's-w':
              self.styleObj.height = '5px'
              self.styleObj.width = '5px'
              self.styleObj.bottom = '0'
              self.styleObj.left = '0'
              self.styleObj.cursor = 'ne-resize'
              break;
            case 's-e':
              self.styleObj.height = '5px'
              self.styleObj.width = '5px'
              self.styleObj.bottom = '0'
              self.styleObj.right = '0'
              self.styleObj.cursor = 'se-resize'
              break;
          }
          self.ele.addEventListener("mousedown", self.mousedown)
        }
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
