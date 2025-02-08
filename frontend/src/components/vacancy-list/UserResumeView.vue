<template>
    <div class="resume-details">
        <div class="second-info" v-if="resume.experienceInYears">{{ resume.experienceInYears }} years experience</div>
        <div class="second-info" v-else>Without experience</div>
        <div class="second-info" v-if="resume.isWithDegree">
            <Icon icon="tabler:school" height="1.2em"/>
            With degree
        </div>
        <div class="skills">
            <Category v-for="skill in resume.skills" 
                :title="skill" color="var(--primary-color)"/>
        </div>
        <div class="description">
            {{ resume.description }}
        </div>
    </div>
</template>

<script setup lang="ts">
import UserResume from '../../types/forms/userResume';
import { Icon } from '@iconify/vue/dist/iconify.js';
import Category from '../inputs/Category.vue';

defineProps({
    resume: {
        type: UserResume,
        required: true,
    }
})

</script>

<style scoped>
.second-info{
	color: #616161;
	display: flex;
	flex-direction: row;
	gap: 6px;
}

.resume-details{
	display: flex;
	flex-direction: column;
	gap: 16px;
}
.skills{
	display: flex;
	flex-direction: row;
	gap: 8px;
	flex-wrap: wrap;
}

.description{
}

</style>