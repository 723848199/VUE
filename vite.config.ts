import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
export default defineConfig({
	base: './',
	plugins: [
		vue(),
		VueSetupExtend(),
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		})
	],
	server: {
		// host: '0.0.0.0',
		//更改启动端口
		// port: 9999,
		// 代理规则示例：将 /api 请求代理到不同的后端 IP 地址
		proxy: {
			'/api': {
				target: 'http://172.16.14.43',//代理的地址
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, '')
			}
		}
  },
	optimizeDeps: {
		include: ['schart.js']
	}
});
