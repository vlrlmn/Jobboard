<template>
	<div class="base-icon-button" v-bind:class="{
		primary: primary,
		[fill]: true
	}">
		<Icon :icon="icon" color="var(--text-color)" height="1.2em" width="1.2em"/> 
	</div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue/dist/iconify.js';

defineProps({
	icon: {
		type: String,
		required: true,
	},
	fill: {
		type: String,
		default: 'default',
		validation(value:string){
			return ['default', 'clear', 'outline'].includes(value)
		}
	},
	primary: Boolean,
})
</script>

<style  scoped>
.base-icon-button{
	display: flex;
	justify-content: center;
	align-items: center;
	height: 36px;
	width: 36px;

	background: var(--button-background);
	border-radius: var(--border-radius);
	border: 1.5px solid transparent;
	box-sizing: border-box;

	cursor: pointer;
	box-sizing: border-box;
	transition: background .15s;
	transition: border-color .15s;
}

.clear {
	background: transparent;
	border-color: transparent;
}

@media (min-width: 868px){
	.base-icon-button:hover{
		border: 1.5px solid var(--border-color);
	}
	.primary:hover{
		background: var(--primary-color-hover);
	}
}

.primary{
	background: var(--primary-color);
	border-color: transparent;
}

</style>