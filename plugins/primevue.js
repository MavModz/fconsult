// plugins/primevue.js
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice'
import { FilterMatchMode } from 'primevue/api';



export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(PrimeVue);
    nuxtApp.vueApp.use(ToastService);
    nuxtApp.vueApp.use(ConfirmationService);
    nuxtApp.vueApp.use(FilterMatchMode);

    // Register Toast component globally
    nuxtApp.vueApp.component('Toast', Toast);
    nuxtApp.vueApp.component('ConfirmDialog', ConfirmDialog);
    nuxtApp.vueApp.component('FilterMatchMode', FilterMatchMode);


    // Add Toast to the global properties
    nuxtApp.provide('toast', nuxtApp.vueApp.config.globalProperties.$toast);
    nuxtApp.provide('confirm', nuxtApp.vueApp.config.globalProperties.$confirm);
    
    nuxtApp.vueApp.config.globalProperties.$filterMatchMode = FilterMatchMode;

    // Provide the global property so it can be accessed in components
    nuxtApp.provide('filterMatchMode', FilterMatchMode);
});
