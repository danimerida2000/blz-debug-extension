/**
 * Popup Entry Point
 *
 * Initializes the Vue application for the extension popup.
 */

import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.mount('#app');
