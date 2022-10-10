'use strict';

/**
 * community-request service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::community-request.community-request');
