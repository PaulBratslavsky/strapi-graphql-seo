'use strict';

const { postsExtendResolver, randomPostResolver } = require('./graphql/post/post');

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
   register({ strapi }) {
    const extensionService = strapi.plugin("graphql").service("extension");
    extensionService.use(postsExtendResolver);
    extensionService.use(randomPostResolver);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
