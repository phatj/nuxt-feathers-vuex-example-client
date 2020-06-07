import Vue from 'vue';
import feathersVuex from 'feathers-vuex';
import consola from 'consola';

import { FeathersClient } from './src/feathers-client';

/**
 * We perform all request-sensitive setup inside contextual functions
 * to avoid cross request contamination
 */
export default ({ store }, inject) => {
  const logger = consola.withScope('feathers-client');
  const feathers = FeathersClient();
  const {
    makeServicePlugin,
    makeAuthPlugin,
    BaseModel,
    FeathersVuex
  } = feathersVuex(feathers, {
    idField: '_id',
    serverAlias: 'api',
    debug: true
  });

  Vue.use(FeathersVuex);
  inject('feathers', feathers);

  // Hack for disabling preserveState during generation
  if (!process.env.preserveState) {
    logger.info('Disabling preserveState...');

    const registerModule = store.registerModule;
    store.registerModule = (path, rawModule, options) =>
      registerModule.call(
        store,
        path,
        rawModule,
        /**
         * This just sets a default of false; it will respect any explict
         * preserveState value afterwards
         */
        Object.assign({ preserveState: false }, options)
      );
  }

  // Register plugins for models
  const requireModule = require.context('../../store/services', false, /.js$/);
  requireModule
    .keys()
    .map((modulePath) => requireModule(modulePath).default)
    .forEach((servicePlugin) => {
      // Inject dependencies into the service plugin rather than require them explicitly
      servicePlugin(feathers, BaseModel, makeServicePlugin)(store);
    });

  // Add auth plugin
  makeAuthPlugin({
    userService: 'users',
    state: {
      entityIdField: 'sub'
    }
  })(store);
};
