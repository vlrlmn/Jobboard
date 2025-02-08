<template>
    <div class="base-textarea">
        <textarea v-model="value"
            ref="textarea"
            @keydown="keyDownHandler"
            @focus="onFocus"
            @blur="onBlur"
            :placeholder="placeholder"
            :rows="rows"
            :maxlength="maxLength"></textarea>
        <div class="limit-string" v-if="maxLength">
            {{ value ? value.length : 0 }} / {{ maxLength }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineModel, defineProps, defineExpose, ref } from 'vue';

const textarea = ref()
const value = defineModel<string|null>()
defineProps({
    placeholder: String,
    rows: Number,
    maxLength: Number,
})

const emits = defineEmits([
    'on-blur',
    'on-focus',
    'on-press-enter',
])

const keyDownHandler = (ev:KeyboardEvent) => {
	
	const keysToHandle = [
		{value: "Enter", action: () => emits('on-press-enter')}
	]

	const currentKey = keysToHandle.find(key => {
		return key.value == ev.key
	})
	if (!currentKey)
		return
	currentKey.action()
}

const focus = () => {
	if (!textarea.value)
		return
    textarea.value.focus()
    emits('on-focus')
}

const onFocus = () => {
    emits('on-focus')
}
const onBlur = () => {
    emits('on-blur')
}

defineExpose({
	focus,
})

</script>

<style scoped>
.base-textarea{
    width: 100%;
    position: relative;
}

textarea{
    width: 100%;
    box-sizing: border-box;
	padding: 7px 11px;
	resize:vertical;
	max-height: 200px;
	min-height: 80px;
	font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
	border-radius: var(--border-radius);
	border: 1px solid var(--border-color);
	background: var(--input-background);
    font-size: 0.9em;
}

textarea:focus{
	background: var(--input-background-hover);
	outline: none;
	box-shadow: 0 0 1px 1px var(--primary-color);
}

.limit-string {
    position: absolute;
    bottom: 7px;
    left: 11px;
    font-size: 0.9em;
    color: #616161;
}
</style>