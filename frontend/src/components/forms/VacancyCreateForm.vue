<template>

	<BaseInput v-model="form.name" placeholder="Name" ref="nameField"
        @on-press-enter="nextField"
        @on-focus="currentFieldName = 'name'"/>
    <BaseInput v-model="form.experience" type="number" ref="experienceField"
        placeholder="Experience" :min="0" :max="100"
        @on-press-enter="nextField"
        @on-focus="currentFieldName = 'experience'"/>
    <BaseInput v-model="form.salary" type="number" 
        :step="100" :min="0"
        placeholder="Salary" ref="salaryField"
        @on-press-enter="nextField"
        @on-focus="currentFieldName = 'salary'"/>
    <BaseTextarea v-model="form.comment" ref="commentField" 
        placeholder="Job description" :rows="5" :maxLength="500"
        @on-focus="currentFieldName = 'comment'"/>
    <BaseSelect v-model="form.location" placeholder="Location" :items="locations"
        with-search/>
    <BaseSelect v-model="form.employment" placeholder="Employment" :items="employments"/>
    <BaseSelect v-model="form.workFormat" placeholder="Work Format" :items="workFormats"/>
    
    <div class="skills" ref="skills">
        Expecting skills
        <BaseButton title="Add Skill" @click="addSkill"/>
        <div class="skill-list">
            <div class="skill-item" v-for="_, index in form.skills" 
                :key="`skill-${index}`">
                <BaseInput v-model="form.skills[index]" :id="`input-${index}`"/>
                <Icon icon="tabler:x" height="1.2em" color="#f73149"
                @click="delSkill(index)"/>
            </div>
        </div>
    </div>
        
    
    <BaseCheckbox v-model="form.isDegreeRequired" label="Is degree required"/>

</template>

<script setup lang="ts">
import BaseTextarea from '../inputs/BaseTextarea.vue'
import BaseInput from '../inputs/BaseInput.vue';
import BaseSelect from '../inputs/BaseSelect.vue';
import BaseButton from '../inputs/BaseButton.vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import VacancyCreate from '../../types/forms/vacancyCreate';
import employments from '../../info/employments';
import BaseCheckbox from '../inputs/BaseCheckbox.vue';
import locations from '../../info/locations';
import workFormats from '../../info/workFormats';

let inputArray:HTMLElement[] = []


const form = defineModel<VacancyCreate>({required:true})
const skills = ref<HTMLElement|null>(null)
const nameField = ref<HTMLElement|null>(null)
const commentField = ref<HTMLElement|null>(null)
const salaryField = ref<HTMLElement|null>(null)
const experienceField = ref<HTMLElement|null>(null)
const currentFieldName = ref<string|null>(null)

onMounted(() => {
    if (!nameField.value)
        return
    nameField.value.focus()
    currentFieldName.value = "name"
})

const nextField = () => {
    const fieldPipeline = [
        {name: "name", next: experienceField.value, nextName: "experience"},
        {name: "experience", next: salaryField.value,  nextName: "salary"},
        {name: "salary", next: commentField.value,  nextName: "comment"},
    ]

    const field = fieldPipeline.find(field => {
        return field.name === currentFieldName.value
    })
    console.log(field?.name, currentFieldName.value)
    if (!field || !field.next)
        return

    field.next.focus()
    currentFieldName.value = field.nextName
}
 
const onKeyPressEnter = (ev:KeyboardEvent) => {
	if (ev.key === "Enter") {
		addSkill()		
	}
}

onUnmounted(() => {
	inputArray.forEach(input => {
		input.removeEventListener("keypress", onKeyPressEnter)
	})
})

const addSkill = () => {
	form.value.skills.push("")
	nextTick(() => {
		if (!skills.value)
			return
		const input = skills.value.querySelector(`#input-${form.value.skills.length - 1}`)
		if (!input)
			return
		const inputField = input.querySelector('input')
		if (!inputField)
			return
		inputField.focus()
		inputArray.push(inputField)
		inputField.addEventListener("keypress", onKeyPressEnter)
	})
}

const delSkill = (index:number) => {
	form.value.skills = form.value.skills.filter((_, i) => i != index)
	const input = inputArray[index]
	input.removeEventListener("keypress", onKeyPressEnter)
	inputArray = inputArray.filter((_, i) => i != index)
}

</script>

<style scoped>


.skills{
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.skill-item{
	padding: 1px;
	box-sizing: border-box;
	/* border: 1px solid var(--primary-color); */
	border-radius: var(--border-radius);
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

.skill-list{
	display: flex;
	flex-direction: column;
	max-height: 200px;
	overflow-y: auto;
	gap: 10px;
}
</style>
