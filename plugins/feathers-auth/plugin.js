import Auth from './src/auth';

export function install(Vue, options) {
  Vue.prototype.$auth = new Auth(options);
}
