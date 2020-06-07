import init, { MemoryStorage } from '@feathersjs/authentication-client';
import { CookieStorage } from 'cookie-storage';

const authClientConfig = {
  storage: process.client
    ? // Use cookies on the client
      new CookieStorage({
        path: '/',
        secure: process.env.USE_SSL
      })
    : // Use memory on the server
      new MemoryStorage(),
  storageKey: process.env.COOKIE_NAME
};

// Wrapped in a function for request separation
export default () => init(authClientConfig);
