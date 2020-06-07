import consola from 'consola';
import { mapActions } from 'vuex';

export default class Auth {
  constructor({ strategy = 'local', redirect = '/', router, store }) {
    this.strategy = strategy;
    this.redirect = redirect;
    this.$router = router;

    this.actions = {
      ...mapActions('auth', ['authenticate', 'logout']),
      ...mapActions('users', { createUser: 'create' }),
      $store: store
    };
  }

  async login(email, password) {
    consola.info(
      `[auth] Authenticating using the '${this.strategy}' strategy...`
    );
    const payload = {
      strategy: this.strategy,
      email,
      password
    };

    await this.actions.authenticate(payload);
    return this.$router.push(this.redirect);
  }

  logout() {
    consola.info('[auth] Logging out...');
    return this.actions.logout();
  }

  async register(userData) {
    consola.info(`[auth] Registering user '${userData.email}'...`);

    await this.actions.createUser(userData);
    return await this.login(userData.email, userData.password);
  }
}
