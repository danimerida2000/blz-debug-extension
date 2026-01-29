import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [vue()],
    test: {
        globals: true,
        environment: 'happy-dom',
        include: ['src/**/*.{test,spec}.{js,ts}'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*.{ts,js,vue}'],
            exclude: ['src/**/*.d.ts', 'src/**/*.{test,spec}.{ts,js}'],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@/popup': path.resolve(__dirname, './src/popup'),
            '@/content-scripts': path.resolve(__dirname, './src/content-scripts'),
            '@/background': path.resolve(__dirname, './src/background'),
            '@/utils': path.resolve(__dirname, './src/utils'),
        },
    },
});
