import Vue from "vue";
import singleSpaVue from 'single-spa-vue';

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el: '#vue-app1',
    template: `
      <div id="vue-app1">
        
      </div>
    `,
    data: {
    },
    beforeMount: function() {

    },
    beforeDestroy: function() {
    }
  }
});

export const bootstrap = [
  vueLifecycles.bootstrap,
];

export const mount = [
  vueLifecycles.mount,
];

export const unmount = [
  vueLifecycles.unmount,
];
