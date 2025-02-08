<template>
    <div class="vacancy-apply-list">
        <VacancyApplyItem v-for="apply in applies" 
        :key="`apply-${apply.userId}`" :apply="apply"
        @on-details="onDetailsHandler"/>
    </div>
</template>

<script setup lang="ts">
import VacancyApply from '../../types/vacancyApply';
import VacancyApplyItem from './VacancyApplyItem.vue';

const emits = defineEmits([
    'on-details',
])

defineProps({
    applies: {
        type: Array<VacancyApply>,
        required: true,
    }
})

const onDetailsHandler = (userId:number) => {
    emits('on-details', userId)
}

</script>

<style scoped>
.vacancy-apply-list{
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow-y: auto;
    height: 468px;
}
</style>    