<template>
	<div class="page">
		<div class="page-frame">
			<NavigationBar/>
			<div class="page-frame__content centered">
				<div class="profile-card">
					<FormCard v-if="userValue">
						<template v-slot:header >
							<h2>{{userValue.getFullName()}}</h2>
						</template>
						<template v-slot:default>
							<div class="support-message main">
								<div>Phone: {{userValue.phone}}</div>
								<div>{{ userValue.email }}</div>
							</div>		
						</template>
					</FormCard>
					
					<FormCard v-if="!isFillResumeForm && !resume">
						<template v-slot:header>
							<h3>Resume</h3>
						</template>

						<template v-slot:default>
							<div class="support-message">
								Go ahead and create a summary about your skills and strong sides.
							</div>							 
						</template>

						<template v-slot:footer>
							<BaseButton title="Create" width="100%" 
								@click="() => isFillResumeForm = true"
								primary/>
						</template>
					</FormCard>
				

					<FormCard v-if="isFillResumeForm && !resume">
						<template v-slot:header>
							<h3>New Resume</h3>
						</template>

						<template v-slot:default>
							<UserResumeForm v-model="resumeForm"/>
						</template>

						<template v-slot:footer>
							<div class="buttons">
								<BaseButton title="Cancel" width="100%" fill="outline"
									@click="() => isFillResumeForm = false"/>
								<BaseButton title="Save" width="100%" primary :disabled="!resumeFormIsValid"
									@click="onSubmitResume"/>
							</div>
						</template>
					</FormCard>

					<FormCard v-if="resume">
						<template v-slot:header>
							<h3>{{ resume.name }}</h3>
						</template>
						<template v-slot:default>
							<UserResumeView :resume="resume"/>
						</template>
					</FormCard>

					<!-- <FormCard v-if="resume">
						<template v-slot:header>
							<h3>Applies</h3>
						</template>
						<template v-slot:default>
							<div class="support-message block">
								Empty list
							</div>
						</template>
					</FormCard> -->

					<BaseButton title="Log Out" @click="logOut"/>

				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import NavigationBar from '../components/navigation-bar/NavigationBar.vue';
import FormCard from '../components/forms/FormCard.vue';
import BaseButton from '../components/inputs/BaseButton.vue';
import UserResumeForm from '../components/forms/UserResumeForm.vue';
import { computed, onMounted, ref } from 'vue';
import UserResume from '../types/forms/userResume';
import UserAuth from '../utils/authUser';
import { useRouter } from 'vue-router';
import UserAPI from '../api/user/api';
import UserResumeView from '../components/vacancy-list/UserResumeView.vue';

const isFillResumeForm = ref(false)
const resumeForm = ref(new UserResume(undefined))
const resumeFormIsValid = computed(() => resumeForm.value.validate())
const resume = ref<UserResume|undefined>()

onMounted(() => {
	if (!UserAuth.getUserId()) {
		router.replace({name: "auth"})
		return
	}

	const userId = UserAuth.getUserId()
	if (!userId) {
		return
	}
	UserAPI.info.getResume(userId).then(response => {
		if (response.status >= 400) {
			throw new Error("Get resume error")
		}
		const data = response.data
		if (!data) {
			return
		}
		resume.value = new UserResume(data)
	})
})

const router = useRouter()

const logOut = () => {
	UserAuth.delUserId()
	router.replace({name: "auth"})
}

const userValue = computed(() => UserAuth.info)

const onSubmitResume = () => {
	const userId = UserAuth.getUserId()
	if (!userId) {
		return
	}
	UserAPI.info.uploadResume(userId, resumeForm.value).then((response) => {
		if (response.status >= 400) {
			throw new Error("Upload resume error")
		}
		isFillResumeForm.value = false
		UserAPI.info.getResume(userId).then(response => {
			if (response.status >= 400) {
				throw new Error("Get resume error")
			}
			resume.value = new UserResume(response.data)
		})
	})
}
</script>

<style scoped>

@media (min-width:868px) {
	.centered {
		padding-top: 16px;
		align-items: center;
		max-width: 100%;
	}
	
}

.content{
	display: flex;
	flex-direction: column;
	gap: 16px;
	height: 100%
}

.support-message{
	width: 100%;
	display: flex;
	align-items: center;
	color: #616161;
	font-size: 0.85em;
	flex-direction: column
}

.support-message.main{
	display: block
}

.blur-enter-active{
	animation: blur .3s;
}

.blur-leave-active{
	animation: blur .3s reverse;
}

@keyframes blur {
	from {
		opacity: 1;

	}
	to {
		opacity: 0;
	}
}

.support-message.block {
	color: var(--silver);
	text-align: center;
	height: 150px;
}

.profile-card{
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.buttons{
	display: flex;
	flex-direction: row;
	gap: 16px;
}
</style>