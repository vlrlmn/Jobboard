<template>
	<div class="base-checkbox">
		<label class="container">{{label}}
			<input type="checkbox" v-model="value">
			<span class="checkmark"></span>
		</label>
	</div>
</template>

<script setup lang="ts">
import { defineModel, defineProps } from 'vue';

const value = defineModel<boolean>({required: true})

defineProps({
	label: String
})

</script>

<style scoped>
.container {
	display: flex;
	align-items: center;
	position: relative;
	padding-left: 30px;
	cursor: pointer;
	font-size: 0.9em;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	height: 1.2em;
}

/* Hide the browser's default checkbox */
.container input {
	position: absolute;
	opacity: 0;
	cursor: pointer;
	height: 0;
	width: 0;
}

/* Create a custom checkbox */
.checkmark {
	position: absolute;
	top: 0px;
	left: -1px;
	height: 1.2em;
	width: 1.2em;
	border: 1px solid var(--border-color);
	border-radius: var(--border-radius);
	background: var(--input-background);
	transition: background .3s;
	box-sizing: border-box;
	user-select: none
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
	background: var(--input-background-hover);
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
	background-color: var(--primary-color);
	border-color: var(--primary-color-hover);
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
	content: "";
	position: absolute;
	display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
	display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
	left: 5px;
	top: 2px;
	width: 3px;
	height: 6px;
	border: solid white;
	border-width: 0 3px 3px 0;
	-webkit-transform: rotate(45deg);
	-ms-transform: rotate(45deg);
	transform: rotate(45deg);
	border-radius: 1px;
}
</style>