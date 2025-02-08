<template>
	<div class="card" v-bind:style="{
		width,
		height,
		background,
	}">
		<div class="card-header" v-if="$slots['header']">
			<slot name="header"></slot>
		</div>
		<div class="card-content" v-if="$slots['default']">
			<slot></slot>
		</div>
		<div class="card-footer" v-if="$slots['footer']">
			<slot name="footer"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps({
	width: {
		type: String,
		default: "300px",
	},
	height: {
		type: String,
		default: "auto",
	},
	background: {
		type: String,
		default: "var(--card-background)",
	}
})
</script>

<style scoped>
.card{
	width: 100%;
	border-radius: 16px;
	box-sizing: border-box;

	position: relative;
	box-shadow: 0 0 14px -7px  var(--border-color);
	transition: box-shadow .3s;

	display: flex;
	flex-direction: column;
	gap: 16px;
	padding: 16px;
	width: 300px;

	transition: height .3s;
	transition: background .3s;
}

@media (min-width: 868px) {
	.card {
		width: 300px;
	}
}

@media (max-width: 468px){
	.card {
		width: 100%;
	}
}


.card-header{
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 12px;
}

.card-content {
	flex:1;
	display: flex;
	flex-direction: column;
	gap: 14px;
}

.card-footer{
	display: flex;
	flex-direction: column;
	gap: 16px;
}
</style>