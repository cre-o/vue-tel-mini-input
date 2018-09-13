import VueTelMiniInput from './vue-tel-mini-input.vue';

export default {
  ...VueTelMiniInput,
  install: (Vue) => {
    Vue.component(VueTelMiniInput.name, VueTelMiniInput);
    return Vue;
  },
};
