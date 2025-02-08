import { App, Directive } from "vue"
import ClickOutside from "./clickOutside.ts"



class DirectiveRaw {
	name: string 
	handler: Directive<any, any>
	constructor(name:string, handler: Directive<any, any>) {
		this.name = name
		this.handler = handler
	}

	register(app:App) {
		app.directive(this.name, this.handler)
	}
} 

const directiveList:Array<DirectiveRaw> = [
	new DirectiveRaw("click-outside", ClickOutside),
]

export default directiveList