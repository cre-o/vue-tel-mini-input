import Vue from 'vue';
import VueTelMiniInput from '../dist/vue-tel-mini-input';
import App from './App.vue';

Vue.use(VueTelMiniInput);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({ ...App }).$mount('#app');
