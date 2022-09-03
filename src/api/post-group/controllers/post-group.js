'use strict';

/**
 *  event controller
 */
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post-group.post-group', ( {strapi}) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;

    const query = {
      ...ctx.query,
      filters: { slug },
    };

    const group = await strapi.entityService.findMany("api::post-group.post-group", query);

    console.log(group, 'group');
    const sanitizedEntity = await this.sanitizeOutput(group, ctx);

    return this.transformResponse(sanitizedEntity[0]);
  },
}));