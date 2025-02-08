<template>
	<div class="base-select" v-click-outside="closeHandler">
		<div class="base-select__field" @click="isOpen = !isOpen" v-bind:class="{
			active: isOpen,
		}">
			<div class="field_icon" v-if="icon">
				<Icon :icon="icon" color="var(--text-color)" height="1.2em" width="1.2em"/>
			</div>
		
			<div class="field_title" v-if="getSelectTitle()">
				{{ getSelectTitle() }}
			</div>
			<div class="field_title empty" v-else>
				{{ placeholder }}			
			</div>

			<div class="field_selector" v-bind:class="{
				'is-open': isOpen,
			}">
				<Icon icon="tabler:chevron-down" color="var(--text-color)" height="1.2em" width="1.2em"/>
			</div>
		</div>
		<transition name="show">
			<div class="base-select__select" v-if="isOpen">
				<div class="search-container" v-if="withSearch">
					<BaseInput
						v-model="search"
						placeholder="Search..."
					/>
				</div>
				<div class="select__item" @click="updateValue(item)"
				v-for="item in items" :key="`item-${item.title}`">
					<div class="item__selector">
						<Icon icon="tabler:circle" 
						height="15px" width="15px"
						:color="checkItem(item) ? 
							'var(--primary-color-hover)' :
							'#626262'"/>
					</div>
					<div class="item__title" translate="no">
						{{ item.title }}
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { computed, ref, toRaw, defineProps } from 'vue';
import BaseInput from './BaseInput.vue';

interface SelectableItem {
	title: string
	value: any
}

function isSelectableItem(obj:Object){
	let isIncludeTitle = (<SelectableItem>obj).title != undefined
	let isIncludeValue = (<SelectableItem>obj).value != undefined
	return isIncludeTitle && isIncludeValue
}

function isSelectableArray(obj:Object){
	if (!Array.isArray(obj)) return false

	let arr:Array<any> = <Array<any>>obj;
	let nonSelectable = arr.find(item => {
		return !isSelectableItem(item)	
	})
	return !Boolean(nonSelectable)
}

const props = defineProps({
	modelValue: {
		type: [
			Object as () => SelectableItem, 
			null,
			Array<SelectableItem>
		],
		nullable: true,
		validator: () => true,
	},
	items: {
		type: Array<SelectableItem>,
		required: true,
	},
	placeholder: {
		type: String,
		default: "Select...",
	},
	icon: String,
	withMultiselect: Boolean,
	withSearch: Boolean,
})

const emits = defineEmits([
	'update:modelValue',
])

const isOpen = ref(false)
const search = ref('')
const items = computed(() => {
	if (props.withSearch && search.value){
		return props.items.filter(item => {
			return item.title.toLowerCase().includes(search.value.toLowerCase())
		})
	}
	return props.items
})
const model = computed(() => props.modelValue)

const getSelectTitle = () => {
	if (!props.modelValue) return null
	
	let current = toRaw(props.modelValue)
	if (isSelectableItem(current)){
		return (<SelectableItem>current).title
	}
	else if (isSelectableArray(current)){
		current = <Array<SelectableItem>>current
		return current
			.map(item => item.title)
			.join(', ')
	}
	return null
}

const checkItem = (item:SelectableItem) => {
	if (!model) return false
	
	let current = toRaw(props.modelValue)
	if (current && isSelectableArray(current)){
		return (<Array<SelectableItem>>current).includes(item)
	}
	else if (current && isSelectableItem(current)){
		return (<SelectableItem>current).value == item.value
	}
	return 
}
const updateValue = (newValue:SelectableItem) => {
	let current = toRaw(props.modelValue)
	if (props.withMultiselect){
		let newItems:Array<SelectableItem> = []
		if (current && isSelectableArray(current)){
			newItems = newItems.concat(current)
			current = <Array<SelectableItem>>current

			let newValueIndex = current.find(
				(it:SelectableItem) => {
					return it.value == newValue.value
				})
			if (newValueIndex)
				newItems = newItems.filter(
					(it:SelectableItem) => {
						return it.value != newValue.value
					}) 
			else
				newItems.push(newValue)
		} else {
			newItems.push(newValue)
		}
		emits('update:modelValue', newItems)
		return
	}

	current = <SelectableItem>current

	if (current && current.value == newValue.value) {
		emits('update:modelValue', null)
	} else {
		emits('update:modelValue', newValue)
	}
	isOpen.value = !isOpen.value
}

const closeHandler = () => {
	isOpen.value = false
}
</script>

<style scoped>
.base-select{
	position: relative;
	font-size: 14px;
	min-width: 160px;
}

.base-select__field{
	display: flex;
	flex-direction: row;
	gap: 10px;
	padding: 7px 11px;

	align-items: center;
	background: var(--input-background);
	border: 1px solid var(--border-color);
	border-radius: var(--border-radius);
	width: 100%;
	box-sizing: border-box;
	transition: box-shadow .15s;
	user-select: none;
	cursor: pointer;
	height: 36px;
	outline: none;
	transition: background .3s;
}



.base-select__field.active{
	border-color: var(--border-color-hover);
	box-shadow: 0 0 1px 1px var(--primary-color-hover);
	background: var(--input-background-hover);
}

.base-select__field:active{
	outline: none;
}

.base-select__field > * {
	display: flex;
	justify-content: center;
}

.field_title{
	width: 100%;
	justify-content: flex-start;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.field_title.empty{
	color: #757575;
}

.base-select__select{
	position: absolute;
	top: 48px;
	box-sizing: border-box;
	width: 100%;

	background: var(--input-background);
	border: 1px solid var(--border-color);
	border-radius: var(--border-radius);

	display: flex;
	flex-direction: column;
	max-height: 164px;
	z-index: 4;
	overflow-y: auto;
}

.search-container{
	width: 100%;
	padding: 5px 7px;
	box-sizing: border-box;
}

.select__item{
	user-select: none;
	display: flex;
	flex-direction: row;
	gap: 8px;
	cursor: pointer;
	padding: 7px 11px;
	box-sizing: border-box;
	transition: background .3s;
}

.select__item + .select__item {
	border-top: 1px solid var(--border-color);
}

.select__item > *{
	display: flex;
	align-items: center;
}

.field_selector{
	transition: transform .25s;
}

.field_selector.is-open{
	transform: rotate(180deg);
}

.show-enter-active{
	animation: open .25s ease-in-out;	
}
.show-leave-active{
	animation: open .25s ease-in-out reverse;	
}

@keyframes open {
	from {
		top: 56px;
		opacity: 0;
	}

	to {
		top: 48px;
		opacity: 1;
	}
}


@media (min-width: 868px){
	.base-select__field:hover{
		background: var(--input-background-hover);
	}
	
	.select__item:hover{
		background: var(--input-background-hover);
	}
}

.field_icon{
	display: flex;
	align-items: center;
}		
</style>