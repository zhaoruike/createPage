<template>
  <base-shape :index="index" :baseData="data" :select="2">
    <div slot="append" v-on:dblclick="changeProType(1,$event)">
      <canvas :width="data.style.width" :height="data.style.height" v-canvas></canvas>
      <property-box v-if="propertyType" @closeProType="changeProType" :attribute="data.attribute" @upDataEle="changeEle"></property-box>
    </div>
  </base-shape>
</template>

<script>
  import baseShape from './baseShape.vue'
  import zrender from 'zrender'
  import propertyBox from './propertyBox.vue'
  export default {
    name: 'pieChart',
    data () {
      return {
        propertyType: false,
        canvas:null,
        zd:null,
        animateSize:10,
        r:75
      }
    },
    created () {
      
    },
    mounted () {
      let self = this
      this.zd = zrender.init(self.canvas, { renderer: 'canvas', devicePixelRatio: 1 })
      // this.drawPin()
      // this.drawPin(100,100,75,Math.PI/180*10,Math.PI/180*20,'yellow')
      this.drawPin(100,100,75,0,Math.PI*2/3,'green')
      this.drawPin(100,100,75,Math.PI*2/3,Math.PI*4/3,'red')
      this.drawPin(100,100,75,Math.PI*4/3,Math.PI*2,'pink')
    },
    props: {
      data: {
        default: function () {
          return {
            style: {
              width: '100px',
              height: '100px',
              top: '0px',
              left: '0px',
              position: 'absolute'
            },
            type: 'pieChart'
          }
        }
      },
      index: {
        default: 0
      }
    },
    methods: {
      drawPin(sx,sy,r,sAngle,eAngle,color){
        let self = this
        let pinEle = this.canvasPin()
        let pin = new pinEle({
            shape: {
              // x, y on the cusp
              sx: sx?sx:100,
              sy: sy?sy:100,
              r:r?r:75,
              sAngle:sAngle?sAngle:0,
              eAngle:eAngle?eAngle:Math.PI,
          },
          style:{
              fill:color?color:'red'
          }
        });
        pin.on('mouseover',self.canvasAnimate.bind(null,pin,true))
        pin.on('mouseout',self.canvasAnimate.bind(null,pin,false))
        this.zd.add(pin);
      },
      canvasAnimate(canvas,type){
        let self = this
        let r = this.r
        canvas.animate().stop(true)
        if(type){
          canvas.animate('shape',false).when(100,{
            r:r+self.animateSize
          }).start()
          canvas.attr({
            style:{
              shadowBlur:10,
              shadowColor:'black',
            }
          })
        }
        if(!type){
          canvas.animate('shape',false).when(100,{
            r:r
          }).start()
          canvas.attr({
            style:{
              shadowBlur:0,
              shadowColor:'transparent',
              shadowOffsetX:0
            }
          })
        }
      },
      canvasPin(){
        let Pin = zrender.Path.extend({
        type: 'pin',
        shape: {
            // x, y on the cusp
            sx: 0,
            sy: 0,
            r:100,
            sAngle:0,
            eAngle:Math.PI/2,

        },
        buildPath: function (path, shape) {
          let arcX = Math.cos(shape.sAngle)*shape.r+shape.sx
          let arcY = Math.sin(shape.sAngle)*shape.r+shape.sy
          path.moveTo(shape.sx,shape.sy)
          path.lineTo(arcX,arcY)
          path.arc(shape.sx,shape.sy,shape.r,shape.sAngle,shape.eAngle)
          path.lineTo(shape.sx,shape.sy)
        }
        });
        return Pin
      },
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
    directives: {
      canvas:{
        bind: function (el, binding, vnode) {
          var self = vnode.context
          self.canvas = el;
        }
      },
    },
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
