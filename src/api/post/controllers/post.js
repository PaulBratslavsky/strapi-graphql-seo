'use strict';

/**
 *  event controller
 */
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post', ( {strapi}) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;

    const query = {
      ...ctx.query,
      filters: { slug },
    };

    const post = await strapi.entityService.findMany("api::post.post", query);
    const sanitizedEntity = await this.sanitizeOutput(post, ctx);

    return this.transformResponse(sanitizedEntity[0]);
  },
}));