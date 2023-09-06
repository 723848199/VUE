<template>
	<div class="container">
		<div class="plugins-tips">
			项目LSW_S20383499853测试用例平台,测试用例情况统计如下：
		</div>
		<div class="schart-box">
			<div class="content-title">柱状图</div>
			<schart class="schart" canvasId="bar" :options="options1"></schart>
		</div>
		<div class="schart-box">
			<div class="content-title">折线图</div>
			<schart class="schart" canvasId="line" :options="options2"></schart>
		</div>
		<div class="schart-box">
			<div class="content-title">饼状图</div>
			<schart class="schart" canvasId="pie" :options="options3"></schart>
		</div>
		<div class="schart-box">
			<div class="content-title">环形图</div>
			<schart class="schart" canvasId="ring" :options="options4"></schart>
		</div>
	</div>
</template>

<script setup lang="ts" name="basecharts">
import Schart from 'vue-schart';

const options1 = {
	type: 'bar',
	title: {
		text: '近一周各款型交换机的测试用例数量统计图表'
	},
	bgColor: '#fbfbfb',
	labels: ['周一', '周二', '周三', '周四', '周五'],
	datasets: [
		{
			label: 'LSW_5735-v2',
			fillColor: 'rgba(241, 49, 74, 0.5)',
			data: [234, 278, 270, 190, 230]
		},
		{
			label: 'LSW_5755',
			data: [164, 178, 190, 135, 160]
		},
		{
			label: 'LSW_AC3',
			data: [144, 198, 150, 235, 120]
		}
	]
};
const options2 = {
	type: 'line',
	title: {
		text: '近几个月各款型交换机的测试用例数量统计图表'
	},
	bgColor: '#fbfbfb',
	labels: ['5月','6月', '7月', '8月', '9月' ],
	datasets: [
		{
			label: 'LSW_5735-v2',
			data: [234, 278, 270, 190, 230]
		},
		{
			label: 'LSW_5755',
			data: [164, 178, 150, 135, 160]
		},
		{
			label: 'LSW_AC3',
			data: [114, 138, 200, 235, 190]
		}
	]
};
const options3 = {
	type: 'pie',
	title: {
		text: '测试用例占比类型饼状图'
	},
	legend: {
		position: 'left'
	},
	bgColor: '#fbfbfb',
            labels: ['老化用例', '流模型', '总线压力', 'POE专项', '监控用例', '电源集成用例', '上下电用例'],
	datasets: [
		{
			data: [334, 278, 190, 235, 260, 200, 141]
		}
	]
};
const options4 = {
	type: 'ring',
	title: {
		text: '各交换机用例总数占比'
	},
	showValue: false,
	legend: {
		position: 'bottom',
		bottom: 40
	},
	bgColor: '#fbfbfb',
	labels: ['LSW_5735-v2', 'LSW_5755', 'LSW_AC3'],
	datasets: [
		{
			data: [500, 500, 500]
		}
	]
};
</script>

<style scoped>
.schart-box {
	display: inline-block;
	margin: 20px;
}
.schart {
	width: 600px;
	height: 400px;
}
.content-title {
	clear: both;
	font-weight: 400;
	line-height: 50px;
	margin: 10px 0;
	font-size: 22px;
	color: #1f2f3d;
}
</style>
