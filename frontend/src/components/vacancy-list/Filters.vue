<template>

	<!-- Search -->

	<BaseInput v-if="fields.search"
	:left-icon="icons['search']" placeholder="Search" 
	v-model="filters.search"/>

	<!-- Employment type -->
	
	<BaseSelect v-if="fields.employment"
		icon="tabler:briefcase" 
		placeholder="Employment" 
		:items="employments" 
		v-model="filters.employments"
		with-multiselect/>

	<!-- Locations -->

	<BaseSelect v-if="fields.locations"
		icon="tabler:map-pin" 
		placeholder="Locations" 
		:items="locations" 
		v-model="filters.locations"
		with-multiselect with-search/>

	<!-- With salary -->

	<BaseCheckbox v-if="fields.salary"
	v-model="filters.withSalary" 
	label="With salary"/>

	<!-- Salary range -->
		
	<transition name="show" v-if="fields.salary">
		<BaseRange v-if="filters.withSalary" 
		v-model="filters.salaryRange" label="Salary range (Monthly)"
		:min="0" :max="10000" :step="100"/>
	</transition>

	<!-- Work Format -->
	<BaseSelect v-if="fields.workFormat" 
		icon="tabler:calendar" 
		placeholder="Work format" 
		:items="workFormats" 
		v-model="filters.workFormats"
		with-multiselect/>

	<!-- Work Format -->
	<BaseSelect v-if="fields.status"
		icon="tabler:arrow-big-up-line" 
		placeholder="Status" 
		:items="statuses" 
		v-model="filters.statuses"
		with-multiselect/>
	
	<!-- With remote -->

	<BaseCheckbox v-if="fields.degree"
	v-model="filters.degreeIsRequired" label="Degree is required"/>

	
</template>

<script setup lang="ts">
import VacancyListFilters from '../../types/vacancyListFilters';
import locations from '../../info/locations';
import workFormats from '../../info/workFormats';
import employments from '../../info/employments';

import BaseInput from '../inputs/BaseInput.vue';
import BaseRange from '../../components/inputs/BaseRange.vue';	
import BaseSelect from '../../components/inputs/BaseSelect.vue';
import BaseCheckbox from '../inputs/BaseCheckbox.vue';
import statuses from '../../info/vacancyStatuses';

const icons = {
	"search" : {
		name: "tabler:search",
	},
}

type FilterFields = {
	search:boolean
	employment:boolean
	locations:boolean 
	salary:boolean
	degree:boolean
	workFormat:boolean
	status:boolean
}

const filters = defineModel<VacancyListFilters>({required:true})

defineProps({
	fields: {
		type: Object as () => FilterFields,
		default: () => {
			return {
				search: true,
				employment: true,
				locations: true,
				salary: true,
				degree: true,
				workFormat: true,
				status: false,
			}
		}
	},
})
</script>

<style scoped>
.show-enter-active{
	animation: open .35s ease-in-out;	
}
.show-leave-active{
	animation: open .35s ease-in-out reverse;	
}

@keyframes open {
	from {
		max-height: 0;
		opacity: 0;
	}

	to {
		max-height: 100%;
		opacity: 1;
	}
}
</style>