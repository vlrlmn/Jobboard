<template>
	<BaseInput v-model="form.name" placeholder="Work specialty"/>
	<BaseInput v-model="form.experienceInYears" type="number" placeholder="Years Experience"	
		:min="0" :max="100"/>
	<BaseTextarea v-model="form.description" placeholder="About You" :rows="5" :max-length="500"/>
	<BaseCheckbox v-model="form.isWithDegree" label="I have degree"/>
	<div class="skills" ref="skills">
		Skills
		<div class="skill-list">
			<div class="skill-item" 
			v-for="_, index in form.skills" 
			:key="`skill-${index}`">
				<BaseInput v-model="form.skills[index]" :id="`input-${index}`"/>
				<Icon icon="tabler:x" height="1.2em" color="#f73149"
					@click="delSkill(index)"/>
			</div>
			<BaseButton title="Add Skill" @click="addSkill"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import UserResume from '../../types/forms/userResume';
import BaseInput from '../inputs/BaseInput.vue';
import BaseButton from '../inputs/BaseButton.vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { nextTick, onUnmounted, ref } from 'vue';
import BaseTextarea from '../inputs/BaseTextarea.vue';
import BaseCheckbox from '../inputs/BaseCheckbox.vue';

let inputArray:HTMLElement[] = []

const form = defineModel<UserResume>({required:true})
const skills = ref<HTMLElement|null>(null)
const emits = defineEmits([
	'on-submit',
])

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
textarea{
	padding: 7px 11px;
	resize:vertical;
	max-height: 200px;
	min-height: 80px;
	font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
	border-radius: var(--border-radius);
	border-color: var(--border-color);
	background: var(--input-background);
}

textarea:focus{
	background: var(--input-background-hover);
	outline: none;
	box-shadow: 0 0 1px 1px var(--primary-color);
}

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
