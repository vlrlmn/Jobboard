<template>
	<BaseInput v-model="form.firstName" ref="firstNameField"
		:left-icon="icons['user']"
		placeholder="First name"/>
	<BaseInput v-model="form.lastName" ref="firstNameField"
		:left-icon="icons['user']"
		placeholder="Last name"/>

	<BaseInput v-model="form.phone" ref="firstNameField"
		:left-icon="icons['phone']"
		placeholder="Phone number"/>

	<BaseInput v-model="form.email" type="email" ref="emailField"
		:left-icon="icons['email']"
		placeholder="Email"/>
	<BaseInput v-model="form.password" type="password" ref="passwordField" 
		:left-icon="icons['pass']"
		supportMessage="Password must contain at least 8 characters" 
		placeholder="Password"/>

	<BaseCheckbox v-model="form.agree" label="I agree with terms and conditions"/>

</template>

<script setup lang="ts">
import RegisterUser from '../../types/forms/registerUser';
import BaseCheckbox from '../inputs/BaseCheckbox.vue';
import BaseInput from '../inputs/BaseInput.vue'
import { defineModel } from 'vue';

const icons = {
	"email" : {
		name: "tabler:mail",
	},
	"pass" : {
		name: "tabler:password",
	},
	"user" : {
		name: "tabler:user-square-rounded",
	},
	"phone" : {
		name: "tabler:phone",
	}
}

const form = defineModel<RegisterUser>({required: true})
</script>

<style scoped>
.name-field {
	display: flex;
	gap: 16px;
	justify-content: space-between;
}
</style>