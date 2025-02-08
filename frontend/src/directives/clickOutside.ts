export default {
	beforeMount(el:any, binding:any) {
		el.clickOutsideEvent = function(event:any) {
			if (!(el === event.target || el.contains(event.target))) {
				binding.value(event);
			}
		};
		document.addEventListener('click', el.clickOutsideEvent);
	},
	unmounted(el:any) {
		document.removeEventListener('click', el.clickOutsideEvent);
	},
}