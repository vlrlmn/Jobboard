<template>
	<div class="range">
		<div class="range-label" v-if="label">
			{{ label }}
		</div>
		<div class="range-slider">
			<span class="range-selected" ref="rangeSelected"></span>
		</div>

		<div class="range-input" v-if="fromValue != undefined && toValue != undefined">
			<input type="range" @input="calcRangeSize" ref="fromPoint" 
				class="min"
				:min="min" 
				:max="max" 
				:value="fromValue || '0'" 
				:step="step">
			<input type="range" @input="calcRangeSize" ref="toPoint" 
				class="max" 
				:min="min" 
				:max="max" 
				:value="toValue || '0'"
				:step="step">
		</div>
		<div class="range-price" v-if="fromValue != undefined && toValue != undefined">     
			<BaseInput v-model="fromValue" type="number"
				:right-icon="icons['dollar']"
				:min="min" :max="max" :step="step"
				@on-input="onEnterValue"/>
			<BaseInput v-model="toValue" type="number"
				:right-icon="icons['dollar']"
				:min="min" :max="max" :step="step"
				@on-input="onEnterValue"/>
		</div>
	</div> 
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import BaseInput from './BaseInput.vue';

const fromPoint = ref<HTMLInputElement | null>(null)
const toPoint = ref<HTMLInputElement | null>(null)
const rangeSelected = ref<HTMLSpanElement | null>(null)

const range = defineModel<number|number[]|undefined>()

const icons = {
	"dollar" : {
		name: 'tabler:currency-dollar'
	}
}

const fromValue = computed({
	get: () => Array.isArray(range.value) ? range.value[0].toString() : undefined,
	set: (val: number) => {
		if (Array.isArray(range.value)) {
			range.value[0] = val
		}
	},
})

const toValue = computed({
	get: () => Array.isArray(range.value) ? range.value[1].toString() : undefined,
	set: (val:number) => {
		if (Array.isArray(range.value)) {
			range.value[1] = val
		}
	},
})

// const singleValue = computed({
// 	get: () => Array.isArray(range.value) ? undefined : range.value,
// 	set: (val: number) => {
// 		range.value = val
// 	},
// })


defineProps({
	label: {
		type: String,
		default: "Select Range",
	},
	min: {
		type: Number,
		default: 0,
	},
	max: {
		type: Number,
		default: 100,
	},
	step: {
		type: Number,
		default: 1,
	},
	withConcurrency: {
		type: Boolean,
		default: false,
	}
})

const calcRangeSize = (e:any) => {
	if (!fromPoint.value || !toPoint.value || !rangeSelected.value) {
		return
	}
	let minRange = Number(fromPoint.value.value);
	let maxRange = Number(toPoint.value.value);

	if (e && e.target.className == "min" && minRange > maxRange && fromValue.value) {   
		fromValue.value = maxRange
		fromPoint.value.value = maxRange.toString() 
		e.preventDefault();
		return
	} else if (e && e.target.className == "max" && maxRange < minRange && toPoint.value) {
		toValue.value = minRange
		toPoint.value.value = minRange.toString() 
		e.preventDefault();
		return      
	} else {
		fromValue.value = minRange
		toValue.value = maxRange
		if (rangeSelected.value && fromPoint.value && toPoint.value) {
			rangeSelected.value.style.left = (minRange / Number(fromPoint.value.max)) * 100 + "%"
			rangeSelected.value.style.right = 100 - (maxRange / Number(toPoint.value.max)) * 100 + "%"
		}
	}
}

const onEnterValue = (e:any) => {
	if (!fromPoint.value || !toPoint.value || !rangeSelected.value) {
		return
	}
	let minPrice = Number(fromValue.value) ?? 0
	let maxPrice = Number(toValue.value) ?? 0
	if (Number.isNaN(minPrice) || Number.isNaN(maxPrice)) {
		return
	}
	if (e && minPrice > maxPrice) {   
		fromValue.value = maxPrice
		fromPoint.value.value = maxPrice.toString()
		e.target.value = maxPrice
		minPrice = maxPrice
	} else if (e && maxPrice < minPrice) {
		toValue.value = minPrice
		toPoint.value.value = minPrice.toString()
		e.target.value = minPrice
		maxPrice = minPrice
	}

	rangeSelected.value.style.left = (minPrice / Number(fromPoint.value.max)) * 100 + "%"
	rangeSelected.value.style.right = 100 - (maxPrice / Number(toPoint.value.max)) * 100 + "%"
}

onMounted(() => {
	calcRangeSize(null)
})

</script>

<style scoped>

.range-label {
	margin-bottom: 16px;
	font-size: 14px;
}

.range-slider {
	height: 2.25px;
	position: relative;
	background-color: var(--border-color);
	border-radius: 2px;
}
.range-selected {
	height: 100%;
	position: absolute;
	border-radius: 3px;
	background-color: var(--primary-color);
}
.range-input {
	position: relative;
}
.range-input input {
	position: absolute;
	width: 100%;
	height: 5px;
	top: -4px;
	background: none;
	pointer-events: none;
	margin: 0;
	-webkit-appearance: none;
	-moz-appearance: none;
}
.range-input input::-webkit-slider-thumb {
	height: 14px;
	width: 14px;
	border-radius: 50%;
	border: 1.5px solid var(--primary-color);
	background-color: white;
	pointer-events: auto;
	-webkit-appearance: none;
}
.range-input input::-moz-range-thumb {
	height: 15px;
	width: 15px;
	border-radius: 50%;
	border: 2px solid var(--primary-color);
	background-color: white;
	pointer-events: auto;
	-moz-appearance: none;
}
.range-price {
	margin-top: 16px;
	width: 100%;
	display: flex;
	flex-direction: row;
	gap: 16px;
}

.range-hints {
	position: relative;
}

.range-hint {
	position: absolute;
	top: 7px;
	height: 20px;
	border: 1px solid var(--primary-color);
	border-radius: 4px;
}
</style>
  