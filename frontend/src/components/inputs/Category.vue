<template>
	<div class="category"
	translate="no"
	@mouseover="isHovered = true" 
	@mouseleave="isHovered = false"
	v-bind:style="{
		'border-color' : color,
		'color' : color,
		'background' : color + (isHovered ? '2a' : '12'),
	}">
		{{ title }}
	</div>
</template>

<script lang="ts">
import { ref } from 'vue';
export default {
	name: "Category",
	props: {
		title: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			default: "#ffffff",
		},
	},
	setup(props) {
		let isHovered = ref(false)

		return {
			isHovered,
			title: props.title,
			color: props.color,
		}
	},
}
</script>

<style scoped>
.category{
	padding: 3px 9px;
	border: 1px solid var(--border-color);
	border-radius: 6px;
	width: fit-content;
	cursor: pointer;

	display: flex;
	justify-content: center;
	align-items: center;

	user-select: none;
	transition: background .25s;

	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
</style>