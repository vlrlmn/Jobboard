<template>
<div class="content-block" :class="class" v-bind:class="{
	outlined: outlined,
}">
	<slot></slot>
</div>
</template>

<script setup lang="ts">
defineProps({
	class: String,
	outlined: Boolean,
})
</script>

<style scoped>
.content-block {
	background-color: #f9f9f9;
	border-radius: 16px;
	padding: 16px;
	max-height: 100%;
}
.outlined{
	border: 1px solid var(--border-color);
}

@media (max-width: 868px){
	.content-block{
		padding: 0;
	}
}
</style>