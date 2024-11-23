import { createApp } from 'vue';
import App from './App.vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const options = {
    position: 'top-right',
    timeout: 3000,
};

const app = createApp(App);
app.use(Toast, options);
app.mount('#app');
