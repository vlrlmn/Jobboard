<template>
	<ContentBlock class="nav-bar">
		<div class="nav-bar__links">
			<div class="nav-bar__logo" @click="navigateTo('home')">
				<Icon icon="tabler:brightness-up-filled" color="var(--primary-color)" height="26px"/>
			</div>
			<div class="nav-bar__link desktop"
			v-for="item in navbarItems"
			:key="`nav-bar-item-${item.id}`"
			v-bind:class="{active: routeName == item.pageName}"
			@click="item.action(item.pageName)">
				<Icon :icon="item.icon" height="16px"/>
				{{ item.title}}
			</div>
		</div>
		<div class="nav-bar__profile">
			<span class="mobile">
				<transition name="open">
					<div class="mobile-menu" v-if="isOpen">
						<div class="nav-bar__link centered"
						v-for="item in navbarItems"
						:key="`nav-bar-item-${item.id}`"
						v-bind:class="{active: routeName == item.pageName}"
						@click="item.action(item.pageName)">
							<Icon :icon="item.icon" height="18px"/>
							{{ item.title}}
						</div>
					</div>
				</transition>
			</span>
			<span class="mobile">
				<BaseIconButton 
					:icon="isOpen ? 'tabler:x' : 'tabler:menu-2'"
					@click="toggleMenu"/>
			</span>
			<span class="mobile">
				<BaseIconButton v-if="!isAuthorized" icon="tabler:arrow-bar-to-right" primary/>
				<BaseIconButton v-else @click="navigateTo('user-profile')" icon="tabler:user"/>
			</span>
			<span class="desktop">
				<BaseButton v-if="!isAuthorized" 
					@click="navigateTo('auth')"
					title="Sign In" 
					icon="tabler:arrow-bar-to-right" 
					primary />
				
				<div class="nav-bar__link" v-else-if="isAuthorized && userId && userValue"
				@click="navigateTo('user-profile')"
				v-bind:class="{active: routeName?.toString().includes('profile')}">
					<Icon icon="tabler:user" height="16px"/>
					{{userValue.getFullName()}}
				</div>
				
				<div class="nav-bar__link" v-else-if="isAuthorized && companyId && companyValue"
				@click="navigateTo('company-profile')"
				v-bind:class="{active: routeName?.toString().includes('profile')}">
					<Icon icon="tabler:briefcase" height="16px"/>
					{{ companyValue.name }}
				</div>
			</span>

		</div>

	</ContentBlock>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';
import ContentBlock from '../ContentBlock.vue';
import BaseButton from '../inputs/BaseButton.vue';
import BaseIconButton from '../inputs/BaseIconButton.vue';
import { computed, ref  } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import UserAuth from '../../utils/authUser';
import CompanyAuth from '../../utils/authCompany';

const isOpen = ref(false);
const toggleMenu = () => {
	isOpen.value = !isOpen.value;
}
const userId = UserAuth.getUserId()
const companyId = CompanyAuth.getCompanyId()
console.log(companyId)
const isAuthorized = userId || companyId

const router = useRouter();
const route = useRoute();

const routeName = computed(() => route.name);

const navigateTo = (name:string) => {
	if (name == routeName.value || name == "") 
		return;
	router.push({name})
}

type NavbarItem = {
	id: number;
	icon: string;
	title: string;
	pageName: string;
	action: (pageName:string) => void;
}

const navbarItems:Array<NavbarItem> = [
	{id: 1, pageName: "vacancy-list", title: "Vacancies", icon: "tabler:search", action: navigateTo},
	{id: 2, pageName: "", title: "Events", icon: "tabler:calendar-event", action: () => {} },
	{id: 3, pageName: "", title: "Companies", icon: "tabler:building", action: () => {} },
]

const companyValue = computed(() => CompanyAuth.info)
const userValue = computed(() => UserAuth.info)

</script>

<style scoped>
.nav-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px;
	border-radius: 12px;
	height: 52px;
	box-sizing: border-box;
	position: sticky;
	top: 0;
	z-index: 4;

	background: rgba( 255, 255, 255, 0.15 );
	/* box-shadow: 0 3px 24px 0 rgba(162, 165, 199, 0.37); */
	box-shadow: 0 0 14px -7px  var(--border-color);

	backdrop-filter: blur( 13px );
	-webkit-backdrop-filter: blur( 13px );
}

.nav-bar__links {
	display: flex;
	gap: 16px;
	height: 100%;
	align-items: center;
}


.nav-bar__link {
	display: flex;
	gap: 8px;
	align-items: center;
	cursor: pointer;
	transition: background .3s;
	padding: 6px 11px;
	flex: 1;
	transition: border-color 0.3s;
	user-select: none;
	border-bottom: 1.5px solid transparent;
}

.nav-bar__link.centered{
	padding: 0;
	gap: 12px;
}

.nav-bar__link.active {
	border-color: var(--primary-color);
}



.nav-bar__profile {
	display: flex;
	gap: 16px;
	height: 100%;
	align-items: center;
}

.nav-bar__logo {
	height: 36px;
	aspect-ratio: 1 / 1;
	border: 1.5px solid var(--border-color);
	border-radius: 8px;

	display: flex;
	box-sizing: border-box;
	justify-content: center;
	align-items: center;
}

.nav-bar__logo > svg {
	transition: transform 0.3s ease;
}

@media (min-width: 868px) {
	.nav-bar__logo:hover > svg  {
		animation: rotate 3.5s linear infinite;
	}
}

@keyframes rotate {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

.mobile-menu {
	position: absolute;
	top: 66px;
	right: 0;
	left: 0;
	z-index: 100;
	background: var(--card-background);
	border-radius: 8px;
	box-shadow: 0 0 8px 1px var(--border-color);
	padding: 12px;
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.open-enter-active {
	animation: open .3s ease;
}

.open-leave-active {
	animation: open .3s ease reverse;
}

@keyframes open {
	from {
		opacity: 0;
		transform: translateY(-10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@media (max-width: 868px) {
	.desktop {
		display: none;
	}
}

@media (min-width: 868px) {
	.mobile {
		display: none;
	}
	.nav-bar__link:hover:not(.active) {
		border-color: var(--border-color);
	}
}
</style>