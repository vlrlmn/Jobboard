<template>
    <BaseTextarea v-model="form.message" 
        label="Message" 
        ref="messageField"/>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import VacancyApply from '../../types/forms/vacancyApply';
import BaseTextarea from '../inputs/BaseTextarea.vue';


const form = defineModel<VacancyApply>({required:true})
    
const messageField = ref<HTMLElement|null>(null)


</script>

<style lang="" scoped>

</style>