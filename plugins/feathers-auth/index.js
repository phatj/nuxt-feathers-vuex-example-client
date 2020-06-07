import Vue from 'vue';
import * as FeathersAuth from './plugin';

export default ({ app }) => {
  Vue.use(FeathersAuth, {
    redirect: '/',
    router: app.router,
    store: app.store
  });
};
