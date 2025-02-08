<template>
	<div class="base-switch" ref="switchField">
		<div class="base-switch__container">
			<div class="base-switch__item"
			v-for="item, index in items"
			@click="value = item.value"
			:key="`switch-${index}`"
			v-bind:style="{
				left: leftByValue(item.value),	
				width: widthByItems(),
			}">
				{{ item.title }}
			</div>
		</div>

		<div class="active" v-bind:style="{
			width: widthByItems(),
			left: leftByValue(value),
		}">	
			{{ activeTitle}}
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, defineModel, ref, computed } from 'vue'

interface SelectableItem {
	title: string
	value: any
}

const props = defineProps({
	items: {
		type: Array<SelectableItem>,
		required: true,
		validate(value: Array<SelectableItem>){
			return value.length > 1
		}
	},
})

const switchField = ref<HTMLElement|null>(null)

const value = defineModel<number>({required: true})
const widthByItems = () => {
	if (switchField.value){
		return `${100 / props.items.length}%`
	}
	return `0`
}
const leftByValue = (value:number) => {
	const index = props.items.findIndex(item => item.value == value)
	return `calc(${index} * ${widthByItems()})`
}

const activeTitle = computed(() => {
	return props.items.find(item => item.value == value.value)?.title
})

</script>

<style scoped>
.base-switch{
	display: flex;
	flex-direction: row;
	position: relative;
	overflow: hidden;
	height: 36px;

}

.base-switch__container{
	overflow: hidden;
	height: inherit;
	width: 100%;
	border-radius: var(--border-radius);
	background: var(--input-background);
}

.base-switch__item{
	position: absolute;
	top: 0;
	bottom: 0;
	padding: 7px 11px;
	cursor: pointer;
	transition: background .3s;
	flex: 1;
	box-sizing: border-box;
	z-index: 2;
	display: flex;
	justify-content: center;
	background: inherit;
	transition: all .3s;
	border: 1.5px solid var(--border-color);
	border-left: none;
	border-right: none;
}

.base-switch__item:first-child{
	border-radius: var(--border-radius) 0 0 var(--border-radius);
	border-left: 1.5px solid var(--border-color);
}

.base-switch__item:last-child{
	border-right: 1.5px solid var(--border-color);
	border-radius: 0 var(--border-radius) var(--border-radius) 0;
}

.base-switch__item:hover{
	background: white;
}

.active {
	position: absolute;
	top: 0;
	height: 100%;
	flex: 1;
	z-index: 2;
	/* background: linear-gradient(90deg, var(--primary-color-opacity) 0%, var(--primary-color) 100%); */
	transition: left .2s;

	display: flex;
	justify-content: center;
	align-items: center;
	border: 1.5px solid var(--primary-color); 
	/* border-bottom: none; */
	box-sizing: border-box;
	border-radius: var(--border-radius);
	background: white;
}
</style>