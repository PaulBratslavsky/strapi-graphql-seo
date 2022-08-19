'use strict';

/**
 *  event controller
 */
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::event.event', ( {strapi}) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;

    const query = {
      filters: { slug },
      ...ctx.query,
    };

    const post = await strapi.entityService.findMany("api::event.event", query);
    const sanitizedEntity = await this.sanitizeOutput(post);

    return this.transformResponse(sanitizedEntity[0]);
  },
}));