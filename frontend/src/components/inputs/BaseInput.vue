<template>
	<div class="base-input-container">
		<div class="base-input" v-bind:class="{
			focused: isFocused,
			'number-without-arrows': type === 'number' && numberIsWithoutArrows
		}">
			<div class="label" v-if="label">
				{{label}}
			</div>
			<div class="left icon" 
			v-if="leftIcon && !leftIcon.isHidden" 
			v-bind:class="{
				'is-button' : leftIcon.onClick
			}">
				<Icon  
					:icon="leftIcon.name" 
					:width="leftIcon.width" 
					:height="leftIcon.height" 
					:color="leftIcon.color"
					@click="leftIcon.onClick ? 
						leftIcon.onClick() : null"
				/>
			</div>

			<input ref="input"
				:type="type ? type : 'text'" 
				:placeholder="placeholder"
				:pattern="type == 'number' ? '[0-9]' : undefined"
				:value="value" 
				:min="min" :max="max" :step="step"
				@input="updateValue"
				@keydown="keyDownHandler"
				@focus="onFocus"
				@blur="onBlur">

			<div class="right icon" 
			v-if="rightIcon"

			v-bind:class="{
				'is-button' : rightIcon.onClick
			}">
				<Icon v-show="!rightIcon.isHidden"
					:icon="rightIcon.name" 
					:width="rightIcon.width" 
					:height="rightIcon.height" 
					:color="rightIcon.color"
					@click="rightIcon.onClick ?
						rightIcon.onClick() : null"
				/>
			</div>
		</div>

		<div class="base-input__support-message" v-if="supportMessage">
			{{ supportMessage }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineModel, defineProps, ref } from 'vue';
import IconT from '../../types/icon';
import {Icon} from '@iconify/vue'

const emits = defineEmits([
	'on-input',
	'on-press-enter',
	'on-focus',
	'on-blur',
])

const input = ref<HTMLElement|null>(null)
const value = defineModel<string|number|null>({required: true})
defineProps({
	placeholder: String,
	rightIcon: 	Object as () => IconT,
	leftIcon: 	Object as () => IconT,
	label: String,
	type: String,
	min: Number,
	max: Number,
	step: Number,
	len: Number,
	supportMessage: String,
	numberIsWithoutArrows: Boolean,
})

const isFocused = ref(false)
const updateValue = (ev: any) => {
	value.value = ev.target["value"]
	emits('on-input', ev)
}

const keyDownHandler = (ev:KeyboardEvent) => {
	
	const keysToHandle = [
		{value: "Enter", action: () => emits('on-press-enter')}
	]

	const currentKey = keysToHandle.find(key => {
		return key.value == ev.key
	})
	if (!currentKey)
		return
	currentKey.action()
}

const focus = () => {
	if (!input.value)
		return
	input.value.focus()
}

defineExpose({
	focus,
})

const onFocus = () => {
	isFocused.value = true
    emits('on-focus')
}
const onBlur = () => {
	isFocused.value = false
    emits('on-blur')
}

</script>

<style scoped>

.base-input{
	display: flex;
	flex-direction: row;
	gap: 8px;

	background: var(--input-background);
	border: 1px solid var(--border-color);
	border-radius: 6px;
	box-sizing: border-box;
	transition: box-shadow .15s;
	font-size: 15px;
	padding: 7px 11px;
	height: 36px;
	transition: background .3s;
}

@media (min-width: 868px){
	.base-input:hover{
		background: var(--input-background-hover);
	}
}

.icon{
	height: 21px;
	width: 21px;
}
.icon.is-button{
	cursor: pointer;
	user-select: none;
}

.base-input {
	position: relative;
}

.base-input > * {
	display: flex;
	align-items: center;
}

.base-input.focused{
	border-color: var(--border-color-hover);
	box-shadow: 0 0 1px 1px var(--primary-color-hover);
	background: var(--input-background-hover);
}

.label {
	position: absolute;
	left: 0;
	top: -24px;
	font-size: 13px;
	font-weight: 300;
}

input{
	border: none;
	background: none;
	padding: 0;
	width: 100%;
	line-height: 21px;
	font-size: 14px;
	height: 21px;
}

input:focus{
	outline: none;
}

.base-input__support-message{
	margin-top: 0.3em;
	font-size: 0.8em;
}


.number-without-arrows > input::-webkit-outer-spin-button,
.number-without-arrows > input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Firefox */
.number-without-arrows > input[type=number] {
  	-moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
}

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button {
  opacity: 1;
}
</style>