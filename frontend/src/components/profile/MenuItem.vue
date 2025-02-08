<template>
	<div class="profile-menu-item" v-bind:class="{
		selected: isSelected
	}">
		<Icon v-if="icon" :icon="icon" height="18px"/>
		{{ title }}
	</div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';


defineProps({
	icon: String,
	title: String,
	isSelected: Boolean,
})
</script>

<style scoped>
.profile-menu-item{
	display: flex;
	gap: 10px;
	align-items: center;
	cursor: pointer;
	padding: 6px 10px;
	box-sizing: border-box;
	border-radius: var(--border-radius);
	transition: border .3s;
	transition: background .3s;
}

.profile-menu-item.selected{
	background: linear-gradient(90deg, var(--primary-color-opacity) 0%, var(--primary-color) 100%);
}

@media (min-width: 868px) {
	.profile-menu-item:not(.selected):hover{
		background: var(--input-background-hover);
	}
}
</style>