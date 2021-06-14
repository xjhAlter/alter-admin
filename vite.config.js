import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
    base: "/demo/",
    plugins: [vue()],
    server: {
        port: 3030,
        strictPort: true,
        open: false
    },
    build: {
        sourcemap: true,
    },
    resolve: {
        alias: { "@": resolve(__dirname, ".", 'src') }
        // alias: [
        //   { find: '@', replacement: resolve(__dirname, 'src') }
        // ]
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "./src/styles/common.scss";`
            }
        }
    }
})
