'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    console.log(strapi.models)
    let entities;
    ctx.query.owner = ctx.state.user.id
    if (ctx.query._q) {
      entities = await strapi.services.articles.search(ctx.query);
    } else {
      entities = await strapi.services.articles.find(ctx.query);
    }

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.articles }));
  },
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.articles.findOne({ id });
    
    console.log(entity);
    return entity.owner && ctx.state.user.id === entity.owner.id ? sanitizeEntity(entity, { model: strapi.models.articles }) : {}
  },
};


