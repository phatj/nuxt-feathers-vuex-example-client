import feathers from '@feathersjs/feathers';

import getRestClient from './transports/axios';
import authClient from './auth-client';

// Wrapped in a function for request separation
const FeathersClient = () => {
  return feathers()
    .configure(getRestClient())
    .configure(authClient());
};

export { FeathersClient };
