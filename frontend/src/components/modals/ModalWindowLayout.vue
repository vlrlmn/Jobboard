<template>
    <div class="modal-window-layout">
        <transition name="backdrop">
            <div class="backdrop" v-if="isOpen" @click="closeHandler" v-bind:style="{
                zIndex : zIndex
            }"></div>
        </transition>
        <transition name="content">
            <div class="content" v-if="isOpen" v-bind:style="{
                zIndex : zIndex + 1
            }">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineModel } from 'vue';
import modalWindowIndexController from '../../utils/modalWindowIndex';

const isOpen = defineModel<boolean>({required:true})
const zIndex = computed(() => {
    if (!isOpen.value) {
        return 10000
    }
    const index = modalWindowIndexController.get()
    modalWindowIndexController.increment()
    return index
})


const props = defineProps({
    closeOnClickOutside:{
        type: Boolean,
        default: false,
    }
})

const emits = defineEmits([
    "on-close",
])

const closeHandler = () => {
    if (!props.closeOnClickOutside) {
        return
    }
    modalWindowIndexController.decrement()
    isOpen.value = false
    emits('on-close')
}

</script>

<style scoped>

.backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 10000;
    background: #15141438;
}

.backdrop-enter-active{ 
    animation: backdrop .3s;
}
.backdrop-leave-active{ 
    animation: backdrop .3s reverse;
}

@keyframes backdrop {
    from {
        background: transparent;
    }
    to {
        background: #15141438;
    }
}

.content{
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 10001;
    transform: translate(-50%, -50%);
}

.content-enter-active{ 
    animation: content .3s;
}
.content-leave-active{ 
    animation: content .3s reverse;
}

@keyframes content {
    from {
        top:54%;
        opacity: 0.6;
    }
    to {
        top:50%;
        opacity: 1;
    }
}
</style>