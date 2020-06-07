import dotenv from 'dotenv';

dotenv.config();

const {
  API_HOST,
  API_PORT,
  CLIENT_HOST,
  CLIENT_PORT,
  COOKIE_NAME,
  USE_SSL,
  DEBUG,
  PRESERVE_STATE
} = process.env;

export default {
  mode: 'universal',
  env: {
    API_HOST,
    API_PORT,
    COOKIE_NAME,
    USE_SSL: !!USE_SSL,
    debug: !!DEBUG,
    preserveState: PRESERVE_STATE !== 'false'
  },
  server: {
    port: CLIENT_PORT,
    host: CLIENT_HOST
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/logger',
    '~/plugins/feathers-client',
    '~/plugins/feathers-auth',
    {
      src: '~/plugins/client-init',
      mode: 'client'
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    transpile: ['feathers-vuex', 'vee-validate/dist/rules'],
    babel: {
      sourceType: 'unambiguous'
    }
  }
};
