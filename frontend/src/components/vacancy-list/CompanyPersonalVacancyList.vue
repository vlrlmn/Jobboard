<template>
    <div class="company-vacancy-list" v-if="vacancies && vacancies.length">
        <Card v-for="vacancy in vacancies" 
        :key="`card-${vacancy.id}`"
        :vacancy="vacancy"
        @click="openModal(vacancy)"
        is-company-view/>
    </div>
    <div class="message" v-else>
        Vacancies not found
    </div>

    <VacancyDetailsModal v-model="modalIsOpen" :vacancy="selectedVacancy" 
        is-company-view/>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Vacancy from '../../types/vacancy';
import VacancyDetailsModal from '../modals/VacancyDetailsModal.vue';
import Card from './Card.vue';

defineProps({
    vacancies: {
        type: Array<Vacancy>,
    }
})

const modalIsOpen = ref(false)
const selectedVacancy = ref<Vacancy | undefined>()
const openModal = (vacancy: Vacancy) => {
    selectedVacancy.value = vacancy
    modalIsOpen.value = true
}

</script>

<style scoped>
.company-vacancy-list{
    display: flex;
    flex-direction: column;
    padding-bottom: 24px;
}

.message {
    color: #616161;
    text-align: center;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
}
</style>
