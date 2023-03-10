'use strict';

/**
 *  event controller
 */
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::page.page', ( {strapi}) => ({
  async findBySlug(ctx) {

    console.log("findBySlug called")
    const { slug } = ctx.params;

    const query = {
      ...ctx.query,
      filters: { slug },
    };

    const page = await strapi.entityService.findMany("api::page.page", query);
    const sanitizedEntity = await this.sanitizeOutput(
      page, ctx);
    return this.transformResponse(sanitizedEntity[0]);
  },
}));