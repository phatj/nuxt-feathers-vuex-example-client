import init, { MemoryStorage } from '@feathersjs/authentication-client';
import { CookieStorage } from 'cookie-storage';

// Wrapped in a function for request separation
export default () => {
  const authClientConfig = {
    storage: process.client
      ? // Use cookies on the client
        new CookieStorage({
          path: '/',
          secure: process.env.USE_SSL
        })
      : // Use memory on the server; no access to document.cookie
        new MemoryStorage(),
    storageKey: process.env.COOKIE_NAME
  };

  init(authClientConfig);
};
