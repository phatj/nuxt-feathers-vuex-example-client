import consola from 'consola';
const logger = consola.withScope('client-init');

export default async (context) => {
  const { store } = context;
  const actionName = 'nuxtClientInit';

  /**
   * @typedef store
   * @property {Object} store._actions
   */
  if (store._actions && store._actions[actionName]) {
    logger.debug('Firing client initialization');
    await store.dispatch(actionName, context);
  }
};
