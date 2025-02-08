<template>
<ModalWindowLayout v-model="isOpen">
    <FormCard background="white">
        <template v-slot:header>
            <h2>{{title}}</h2>
        </template>
        <template v-slot:default>
            <p>{{ message }}</p>
        </template>
        <template v-slot:footer>
            <div class="buttons">
                <BaseButton :title="cancelText" @click="cancelHandler"/>
                <BaseButton :title="confirmText" @click="confirmHandler" primary/>
            </div>
        </template>
    </FormCard>
</ModalWindowLayout>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import ModalWindowLayout from '../modals/ModalWindowLayout.vue';
import FormCard from '../forms/FormCard.vue';
import BaseButton from '../inputs/BaseButton.vue';

const isOpen = defineModel<boolean>({required: true})

defineProps({
    message: {
        type: String,
        default: 'Are you sure you want to delete this item?'
    },
    title: {
        type: String,
        default: 'Alert'
    },
    confirmText: {
        type: String,
        default: 'Confirm'
    },
    cancelText: {
        type: String,
        default: 'Cancel'
    }
})

const emit = defineEmits([
    'on-confirm',
    'on-cancel'
])

const confirmHandler = () => {
    emit('on-confirm')
    isOpen.value = false
}

const cancelHandler = () => {
    emit('on-cancel')
    isOpen.value = false
}

</script>

<style scoped>
.buttons{
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(2, 1fr);
}
</style>