import { createApp } from 'vue';

import App from './App.vue';
import PrimeVue from 'primevue/config';
import router from './routers/router';
import { createPinia } from 'pinia';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import BlockUI from 'primevue/blockui';

import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import ToastService from 'primevue/toastservice';
import Dropdown from 'primevue/dropdown';
import Menubar from 'primevue/menubar';

const app = createApp(App);

app.use(PrimeVue);

app.use(router);
app.use(createPinia());
app.use(ToastService);
app.component('InputText', InputText);
app.component('Button', Button);
app.component('Dialog', Dialog);
app.component('BlockUI', BlockUI);
app.component('Menubar', Menubar);
app.component('Dropdown', Dropdown);

app.mount('#app');
