'use strict';

/**
 * `page-middleware` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In page-middleware middleware.');

    ctx.query.populate = {
      page_layout: {
        populate: {
          image: {
            populate: "*"
          },
          heroLink: {
            populate: "*"
          },
        },
      }
    };

    await next();
    };
  };
