export default (feathersClient, BaseModel, makeServicePlugin) => {
  class User extends BaseModel {
    // Required for $FeathersVuex plugin to work after production transpile.
    static modelName = 'User';
    // Define default properties here
    static instanceDefaults() {
      return {
        email: '',
        password: ''
      };
    }
  }
  const servicePath = 'users';
  const servicePlugin = makeServicePlugin({
    Model: User,
    service: feathersClient.service(servicePath),
    servicePath
  });

  // Setup the client-side Feathers hooks.
  feathersClient.service(servicePath).hooks({
    before: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    },
    after: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    },
    error: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    }
  });

  return servicePlugin;
};