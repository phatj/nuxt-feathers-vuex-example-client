import { initAuth } from 'feathers-vuex';
import consola from 'consola';

const logger = consola.withScope('store');

const state = () => ({});

const reAuthenticate = async (payload, dispatch) => {
  if (payload) {
    logger.info(`Reauthenticating user ${payload.sub}`);

    /**
     * Calling the underlying feathersClient.authenticate without
     * auth data causes the feathers client to initiate
     * a reauthentication request.
     *
     * See https://github.com/feathersjs/feathers/blob/master/packages/authentication-client/src/core.ts#L156
     */
    const response = await dispatch('auth/authenticate');

    logger.debug('[auth] token', response.accessToken);
    logger.info(`Successfully reauthenticated ${payload.sub}`);

    return response;
  }

  return payload;
};

const actions = {
  async nuxtServerInit({ commit, dispatch, state }, { req }) {
    if (!req) {
      return;
    }

    const payload = await initAuth({
      commit,
      req,
      cookieName: process.env.COOKIE_NAME
    });

    logger.debug('Auth store state: ', state.auth.accessToken);

    // Manually update the in memory storage with the auth key pulled from the cookie
    await this.$feathers.authentication.setAccessToken(state.auth.accessToken);

    return reAuthenticate(payload, dispatch);
  },
  async nuxtClientInit({ commit, dispatch, state }) {
    if (!state.auth) {
      logger.info('Auth state does not exist, preventing reauthentication');
      return;
    }

    // Handle state hydration
    let { payload } = state.auth;

    // Handle empty state, but an exiting JWT cookie
    if (!payload && document.cookie) {
      logger.debug('Pulling payload from cookie');

      payload = await initAuth({
        commit,
        req: {
          headers: {
            cookie: document.cookie
          }
        },
        cookieName: process.env.COOKIE_NAME
      });
    }

    return reAuthenticate(payload, dispatch);
  }
};

export { actions, state };
