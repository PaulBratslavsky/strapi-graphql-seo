'use strict';

/**
 * short-post service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::short-post.short-post');
