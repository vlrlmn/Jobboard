<template>
	<div class="profile-menu">
		<MenuItem v-for="item, index in options" 
			:key="`menu-${index}`" 
			:icon="item.icon"
			:title="item.title"
			:isSelected="currentValue == item.value"
			@click="currentValue = item.value"/>
	</div>
</template>

<script setup lang="ts">
import MenuItem from './MenuItem.vue';


type SelectableItem = {
	icon:string
	title:string
	value:number
}

const currentValue = defineModel<number>({required: true})

defineProps({
	options: {
		type: Array<SelectableItem>,
		required: true,
	}
})

</script>

<style scoped>
.profile-menu{
	display: flex;
	flex-direction: column;
	gap: 10px;
}
</style>