<template>
	<div id="app">
		<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons">
		<div class="content">
			<Form/>
			<Table/>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import VueMaterial from 'vue-material'
	import 'vue-material/dist/vue-material.min.css'
	import 'vue-material/dist/theme/default.css'
	
	import Form from './components/Form'
	import Table from './components/Table'

	Vue.use(VueMaterial)

	export default {
		name: 'App',
		components: {
			Form,
			Table
		}
	}
</script>

<style lang="less" scoped>
	.content {
		margin: 25px;
	}
</style>
