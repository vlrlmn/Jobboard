import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue()],
	server: {
		proxy: {
			'/company': {
				target: 'http://localhost:8000',
			},
			'/api/user': {
				target: 'http://localhost:8001',
			},
			'/api/vacancy': {
				target: 'http://localhost:8001',
			},
		},
		cors:false
	},
})
