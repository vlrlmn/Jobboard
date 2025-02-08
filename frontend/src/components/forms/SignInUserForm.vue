<template>
	<BaseInput v-model="form.email" type="email" ref="emailField"
		:left-icon="icons['email']"
		placeholder="Email"/>
	<BaseInput v-model="form.password" type="password" ref="passwordField" 
		:left-icon="icons['pass']" 
		placeholder="Password"/>
</template>

<script setup lang="ts">
import SignInUser from '../../types/forms/signInUser';
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
}

const form = defineModel<SignInUser>({required: true})
</script>