<template>
	<div class="page">
		<div class="page-frame centered">
			<div class="page-frame__content">
				<div class="info-card">
					<div class="header">
						<h4>Junior Sunflower</h4>
						<h1>Let's find your first Job!</h1>
					</div>

					<div class="buttons">
						<BaseInput :left-icon="icons['search']" placeholder="Field of interest" v-model="search"/>
						<BaseSelect icon="tabler:briefcase" placeholder="Employment" 
							:items="employments" v-model="selected"
							with-multiselect/>
						<BaseButton id="search-desktop" title="Search" primary @click="navigateTo('vacancy-list')"/>
					</div>

					<div class="some-info">
						<Category title="Easy to Attend" color="#f09156"/>
						<Category title="For Beginners" color="#f09156"/>
						<Category title="Absolutely Free" color="#f09156"/>
					</div>

					<BaseButton class="search-mobile" title="Search" primary 
						@click="navigateTo('vacancy-list')"/>
					<BaseButton class="search-mobile" title="For Bysiness" fill="clear"
						@click="navigateTo('auth')"/>
				</div>
			</div>
		</div>
	</div>	
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from '../components/inputs/BaseButton.vue';
import BaseInput from '../components/inputs/BaseInput.vue';
import BaseSelect from '../components/inputs/BaseSelect.vue';
import Category from '../components/inputs/Category.vue';
import { useRouter } from 'vue-router';
import employments from '../info/employments';

const selected = ref(employments[0])
const search = ref('');
const icons = {
	"search" : {
		name: "tabler:search",
	},
}
const router = useRouter();
const navigateTo = (routeName:string) => {
	const query:{s:string|undefined, e:number|number[]|undefined} = {
		s: undefined,
		e: undefined,
	}

	if (search.value){
		query['s'] = search.value
	} 

	if (selected.value){
		if (Array.isArray(selected.value)){
			query['e'] = selected.value.map(item => item.value)
		} else {
			query['e'] = selected.value.value
		}
	}

	router.push({name: routeName, query})
}



</script>

<style scoped>
.header{
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
}

.buttons{
	display: flex;
	flex-direction: row;
	gap: 10px;
}


.centered {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}



@media (max-width: 868px){
	#search-desktop {
		display: none;
	}

	.centered{
		align-items: normal;
	}
}

@media (min-width: 868px) {
	.search-mobile {
		display: none;
	}
}

.some-info{
	display: flex;
	flex-direction: row;
	gap: 10px;
}

.buttons > * {
	width: fit-content;
}

.info-card{
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 10px;
}


</style>