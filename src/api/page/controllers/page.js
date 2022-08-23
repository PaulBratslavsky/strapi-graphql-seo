'use strict';

/**
 *  event controller
 */
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::page.page', ( {strapi}) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;

    const query = {
      ...ctx.query,
      filters: { slug },
    };

    const page = await strapi.entityService.findMany("api::page.age", query);
    const sanitizedEntity = await this.sanitizeOutput(page, ctx);

    return this.transformResponse(sanitizedEntity[0]);
  },
}));