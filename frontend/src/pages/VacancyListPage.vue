<template>
	<div class="page">
		<div class="page-frame">
			<NavigationBar/>
			<div class="page-frame__content grid-container">
				<div class="content">
					<div class="block"  style="padding-top: 16px">
						<ContentBlock class="add" outlined>
							<div class="add-cover">
								<h3>Hard to make the CV?</h3>
								<div>Let our specialists help you to find your strong sides</div>
							</div>
						</ContentBlock>
						<ContentBlock class="desktop more-filters">
							<h4>
								<Icon icon="tabler:filter" style="margin-right: 4px" height="1.2em" color="var(--primary-color)"/>
								Filters
							</h4>
							<Filters v-model="filters"/>
						</ContentBlock>
					</div>
					<div class="block">
						<ContentBlock class="filters mobile">
							<BaseIconButton class="mobile" 
								:icon="mobileFiltersIsOpen ? 'tabler:x' : 'tabler:filter'" 
								@click="toggleMobileFilters"/>
							<span class="mobile">
								<transition name="open">
									<div class="mobile-menu" v-if="mobileFiltersIsOpen"></div>
								</transition>
							</span>
						</ContentBlock>
						<ContentBlock class="vacancy-list">
							<Card v-for="vacancy in vacancyList" 
							:key="`vacancy-${vacancy.id}`" 
							:vacancy="vacancy"
							@click="() => openModal(vacancy)"/>
						</ContentBlock>
					</div>
				</div>
			</div>
			<VacancyDetailsModal v-model="isModalOpen" :vacancy="selectedVacancy"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import ContentBlock from '../components/ContentBlock.vue';
import NavigationBar from '../components/navigation-bar/NavigationBar.vue';
import BaseIconButton from '../components/inputs/BaseIconButton.vue';
import VacancyListFilters from '../types/vacancyListFilters';
import { useRoute } from 'vue-router';
import router from '../router';
import Filters from '../components/vacancy-list/Filters.vue';
import Vacancy from '../types/vacancy';
import Card from '../components/vacancy-list/Card.vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import VacancyDetailsModal from '../components/modals/VacancyDetailsModal.vue';
import CompanyAPI from '../api/company/api';

const isModalOpen = ref(false)
const selectedVacancy = ref<Vacancy|undefined>()
const openModal = (vacancy:Vacancy) => {
	selectedVacancy.value = vacancy
	isModalOpen.value = true
}

const mobileFiltersIsOpen = ref(false)
const toggleMobileFilters = () => {
	mobileFiltersIsOpen.value = !mobileFiltersIsOpen.value;
}

const route = useRoute()
const filters = ref(new VacancyListFilters(route.query))
let timeout:number|null = null

const vacancyList = ref<Vacancy[]>([])
const updateVacancyList = () => {
	CompanyAPI.vacancy.list(filters.value).then((response) => {
		if (response.status >= 400) {
			console.error(response)
			return
		}
		const data = response.data
		if (!data || !data.vacancies || data.vacancies.length === 0) {
			vacancyList.value = []
			return
		}

		vacancyList.value = data.vacancies.map((vacancyData:any) => new Vacancy(vacancyData))
	})
}
updateVacancyList()


watch(() => filters.value, () => {
	
	if (timeout) {
		clearTimeout(timeout)
	}
	
	timeout = setTimeout(() => {
		updateVacancyList()
		const query = filters.value.toQuery()
		router.replace({name: 'vacancy-list', query})
	}, 200)
}, {deep: true})

</script>

<style scoped>
.filters{
	display: flex;
	flex-direction: row;
	gap: 10px;
	background: none;
	padding: 0;
	position: relative;
}

.filters > .base-input {
	width: max(30%, 220px);
	max-width: 300px;
	border-radius: 16px;
}

.more-filters {
	display: flex;
	flex-direction: column;
	gap: 16px;
	background: transparent;
	border: 1px solid var(--border-color);
	transition: height .3s;
}

.add {
	border-color: var(--primary-color);
	background: linear-gradient(90deg, var(--primary-color-opacity) 0%, var(--primary-color) 100%);
	padding: 0;
	overflow: hidden;
	cursor: pointer;
}

.add-cover {
	padding: 16px;
	height: 100%;
	box-sizing: border-box;
	background: rgba( 255, 255, 255, 0.15 );
	box-shadow: 0 8px 32px 0 rgba(162, 165, 199, 0.37);
	backdrop-filter: blur( 13px );
	-webkit-backdrop-filter: blur( 13px );
	border-radius: 10px;

	display: flex;
	flex-direction: column;
	gap: 12px;
}


.block {
	display: flex;
	flex-direction: column;
	gap: 16px;
	height: 100%;
}

.content {
	display: grid;
	grid-template-columns: 240px 1fr;
}

.vacancy-list {
	background:transparent; 
	padding: 16px;
}

@media (max-width: 868px) {
	.content {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.vacancy-list {
		padding: 0;
	}
}

@media (max-width: 868px) {
	.desktop {
		display: none;
	}
}

@media (min-width: 868px) {
	.mobile {
		display: none;
	}
}

.grid-container {
	display: block;
}
</style>