'use strict';

/**
 *  event controller
 */
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::event.event', ( {strapi}) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;

    const query = {
      ...ctx.query,
      filters: { slug },
    };

    const event = await strapi.entityService.findMany("api::event.event", query);
    const sanitizedEntity = await this.sanitizeOutput(event, ctx);

    return this.transformResponse(sanitizedEntity[0]);
  },
}));