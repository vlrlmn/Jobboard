<template>
	<div class="vacancy-card">

		<div class="vacancy-card__subtitle" v-if="!isCompanyView">
			{{ vacancy.companyName }}
		</div>

		<div class="vacancy-card__title">
			{{ vacancy.name }}
		</div>
		<div class="vacancy-card__footer">

			<div class="vacancy-card__info">
				<div class="info-item" v-if="vacancy.employmentId">
					<Icon icon="tabler:briefcase" size="1.1em" />
					{{ getEmployment(vacancy.employmentId) }}
				</div>
				<div class="info-item" v-if="vacancy.workFormatId">
					<Icon :icon="vacancy.workFormatId == 1 ? 
						'tabler:wifi' : 'tabler:building'" size="1.1em"/>
					{{ getWorkFormat(vacancy.workFormatId) }}
				</div>
				<div class="info-item">
					<Icon icon="tabler:map-pin" size="1.1em"/>
					{{ getLocationName(vacancy.locationId)}}
				</div>
			</div>
			<div class="vacancy-card__info second" v-if="!isCompanyView">
				{{ vacancy.salary }} AED
			</div>
			<!-- <div class="vacancy-card__subtitle" v-else>
				<Icon icon="tabler:user" size="1.2em" color="var(--primary-color)" />
				{{ vacancy.applies }} applies
			</div> -->
		</div>
	</div>
</template>

<script setup lang="ts">
import Vacancy from '../../types/vacancy';
import { defineProps } from 'vue';
import locations from '../../info/locations';
import workFormats from '../../info/workFormats';
import { Icon } from '@iconify/vue/dist/iconify.js';
import employments from '../../info/employments';

defineProps({
	vacancy : {
		type: Vacancy,
		required: true,
	},
	isCompanyView:{
		type: Boolean,
		required: false,
	}
})


const getLocationName = (id:number) => {
    return locations.find(loc => loc.value == id)?.title
}

const getWorkFormat = (id:number) => {
	return workFormats.find(wf => wf.value == id)?.title
}

const getEmployment = (id:number) => {
	return employments.find(e => e.value == id)?.title
}

</script>

<style scoped>
.vacancy-card {
	width: 100%;
	padding: 16px;
	border-radius: 16px;
	box-sizing: border-box;

	position: relative;
	box-shadow: 0 0 14px -7px  var(--border-color);
	transition: box-shadow .3s;

	cursor: pointer;
}

@media (min-width: 868px) {
	.vacancy-card:hover {
		box-shadow: 0 0 14px -3px  var(--border-color);
	}
}

.vacancy-card + .vacancy-card {
	margin-top: 16px;
}

.vacancy-card__subtitle{
	display: flex;
	flex-direction: row;
	gap: 6px;
}

.vacancy-card__title {
	font-size: 20px;
	font-weight: 500;
	margin-bottom: 16px;
}

.vacancy-card__subtitle + .vacancy-card__title{
	margin-top: 12px;
}

.vacancy-card__footer{
	display: flex;
	flex-direction: row;
	gap: 16px;
	justify-content: space-between;
}

.vacancy-card__info{
	border-radius: 4px;
	
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 6px;
	user-select: none;
	flex-wrap: wrap;
}

.vacancy-card__info.second{
	width: 10ch;
	justify-content: flex-end;
}


.info-item{
	padding: 7px 11px;
	background-color: #f3f3f3;
	border-radius: var(--border-radius);
	font-size: 0.95em;
	color: #666666;
	width: fit-content;

	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 5px;
}
</style>