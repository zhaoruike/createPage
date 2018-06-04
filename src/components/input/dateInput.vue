<template>
  <div class="date-box" v-date>
		<input class="date-def-input" @focus="toSelectDate(true)"  @blur="toSelectDate(true)" type="text">
		<div v-text="showDate" class="date-show-box" ></div>
		<div class="date-select-box" v-show="selectBoxType">
			<div class="date-select-title"><span class="select-left-box"><span @click="changeYear(-1)"><<</span><span @click="changeMonth(-1)"><</span></span><span v-text="selectYear+'年'"></span><span v-text="selectMonth+'月'"></span><span class="select-right-box"><span @click="changeMonth(1)">></span><span @click="changeYear(-1)">>></span></span></div>
		  <div>
				<ul class="week-list">
					<li v-for="val in weekList" v-text="val"></li>
				</ul>
				<ul class="date-list">
					<li v-for="(val,index) in dateList" v-text="val.value" :class="val.def?'def-date':''" @click="checkDate(index)" :style="{color:val.select?'red':''}"></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import {common} from '../../common/common.js'
	export default {
		data () {
			return {
				ele:null,
        		showDate:'',
				selectYear:'',
				selectMonth:'',
				selectDay:'',
				weekList:['日','一','二','三','四','五','六'],
				dateList:[],
				selectBoxType:false
			}
		},
		created () {
			var self = this
            this.showDate = common.formDate(self.data.data.format,self.data.data.defDate)
			this.data.backValue = this.showDate
			this.selectYear = new Date(self.data.data.defDate).getFullYear()
			this.selectMonth = new Date(self.data.data.defDate).getMonth()+1
			this.drawDate()
		},
		mounted () {
			let self = this
			document.addEventListener('click',function(){
				self.toSelectDate(false)
			})
			
		},
		props :{
			data:{
				default(){
					return{
						defDate:new Date().getTime(),
						format:"yyyy/MM/dd",
						backValue: common.formDate('yyyy/MM/dd',new Date().getTime())
					}
				}
			}
		},
		methods:{
			toSelectDate(type){
				this.selectBoxType = type
			},
			getCountDays(year,month){
				var curDate = new Date()
				curDate.setYear(year)
				curDate.setMonth(month)
				curDate.setDate(0)
				return curDate.getDate()
			},
			getWeekFirst(year,month){
				var curDate = new Date()
				curDate.setYear(year)
				curDate.setMonth(month)
				curDate.setDate(1)
				return curDate.getDay()
			},
			drawDate(){
				let self = this
				let days = self.getCountDays(self.selectYear,self.selectMonth)
				let weekFirst = self.getWeekFirst(self.selectYear,self.selectMonth)
				let today = new Date()
				self.dateList = []
				for(let i=0;i<weekFirst;i++){
					self.dateList.push({})
				}
				for(let i=0;i<days;i++){
					self.dateList.push({def:false,select:false,value:i+1})
					if(today.getFullYear() == self.selectYear){
						if(today.getMonth() + 1 == self.selectMonth){
							if(today.getDate() == i+1){
								self.dateList[i].def = true
							}
						}
					}				
				}
			},
			checkDate(index){
				let self=this
				for(let i=0;i<self.dateList.length;i++){
					self.dateList[i].select = false
				}
				self.dateList[index].select = true
				if(self.data.data.format.indexOf('-')!==-1){
					self.showDate = self.selectYear + '-' + self.selectMonth+'-'+self.dateList[index].value
				}

				if(self.data.data.format.indexOf('/')!==-1){
					self.showDate = self.selectYear + '/' + self.selectMonth+'/'+self.dateList[index].value
				}
				self.data.value = self.showDate
				self.toSelectDate(true)
			},
			changeYear(val){
				var self = this
				self.selectYear = parseInt(self.selectYear) + val 
				if(self.selectYear < 0){
					self.selectYear = new Date().getFullYear()
				}
				self.drawDate()
			},
			changeMonth(val){
				var self = this
				self.selectMonth = parseInt(self.selectMonth) + val
				if(self.selectMonth > 12){
					self.selectMonth = 1
					self.changeYear(1)					
				}
				if(self.selectMonth < 1){
					self.selectMonth = 12
					self.changeYear(-1)					
				} 
			}
		},
	  directives:{
		  date: {
				bind: function (el, binding, vnode) {
					var self = vnode.context
					self.ele = el;
					self.ele.addEventListener('click', function(event){
						let e = event || window.event
						e.stopPropagation()
					})
				}
      }
	  },
		components:{},
		destoryed (){}	
	}
</script>

<style scoped>
	.date-box{
		position:relative;
		overflow:visible;
	}
	.date-show-box{
		display:inline-block;
		width:100%;
    min-width:140px;
		font-size:14px;
		height:22px;
		line-height:14px;
		border:1px solid #ccc;
		border-radius:3px;
		padding:3px 5px;
		box-sizing:border-box;
	}

	.date-select-box{
		position:absolute;
    top:20px;
		min-width:140px;
		width:100%;
		font-size:14px;
		border:1px solid #ccc;
		box-sizing:border-box
	}
	.date-select-title{
		text-align:center;
		padding:4px 5px;
		overflow:hidden;
		font-size:14px;
	}
	.select-left-box{
		float:left;
		line-height:18px;
	}

	.select-left-box > span:nth-child(1):hover{
		color:#42b983
	}

	.select-left-box > span:nth-child(2):hover{
		color:#42b983
	}

	.select-left-box > span:nth-child(1){
		padding-right:2px;
	}

	.select-right-box{
		float:right;
	  line-height:18px;
	}

	.select-right-box > span:nth-child(1):hover{
		color:#42b983
	}

	.select-right-box > span:nth-child(2):hover{
		color:#42b983
	}

	.select-right-box > span:nth-child(1){
		padding-right:2px;
	}

	.week-list,.date-list{
		overflow:hidden;
		padding-left:3px;
	}

	.week-list > li,.date-list > li{
		float:left;
		width:14%;
		text-align:center;
    padding:3px 0;
		font-size:12px;
	}
	.def-date{
		background:#42b983
	}

	.date-list > li:hover{
		color:red
	}

	.date-def-input{
		position:absolute;
		width:100%;
		height:100%;
		z-index:10;
    top:0;
		left:0;
		opacity:0
	}


</style>