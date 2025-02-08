<template>
    <div class="vacancy-apply-item">
        <div class="item-card" @click="onOpenDetails">
            <div class="item-card__cont">
                <div class="item__title">
                    <h3>{{ apply.userName }}</h3>
                </div>
                <div class="item__sub-title">
                    <div>{{ apply.resumeName }}</div>
                    <div v-if="apply.experience">{{ apply.experience }} years experience</div>
                </div>
            </div>
            <div class="item__buttons">
                <BaseIconButton 
                fill="clear"
                icon="tabler:chevron-right"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import VacancyApply from '../../types/vacancyApply';
import BaseIconButton from '../inputs/BaseIconButton.vue';

const emits = defineEmits([
    'on-details'
])

const props = defineProps({
    apply: {
        type: VacancyApply,
        required: true,
    }
})

const onOpenDetails = () => {
    emits('on-details', props.apply.userId)
}

</script>

<style scoped>
.vacancy-apply-item{
    display: flex;
    flex-direction: column;
}

.item__buttons{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
}

.item__sub-title{
    color:#616161;
    font-size: 0.9em;
    display: flex;
    flex-direction: row;
    gap: 8px;
    flex-wrap: wrap;
}
.item-card{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    cursor: pointer;
}

.item-details {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 10px;
    max-height: 260px;
    overflow-y: auto;
}

.details-enter-active{
    animation: details .3s;
}
.details-leave-active{
    animation: details .3s reverse;
}

@keyframes details {
    from {
        opacity: 0;
        max-height: 0;
    }
    to {
        opacity: 1;
        max-height: 260px;
    }
}
</style>