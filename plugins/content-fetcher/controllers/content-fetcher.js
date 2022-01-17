'use strict';

//console.log(strapi.config);
/**
 * content-fetcher.js controller
 *
 * @description: A set of functions called "actions" of the `content-fetcher` plugin.
 */

const axios = require('axios').default;
module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async ctx => {
    // Add your own logic here. Send 200 `ok`
    ctx.send({message: 'ok'});
  },
  add  : async ctx => {
    const q = ctx.request.query;
    if (!q.url) {
      ctx.response.status = 400;
      ctx.send('URL required');
      return;
    } else {
      let options = {
        method : 'GET',
        url    : 'https://lexper.p.rapidapi.com/v1.1/extract',
        params : {
          url  : q.url,
          media: '1'
        },
        headers: {
          'x-rapidapi-key' : '9a51c904aemsh5a3399ae9cf7289p1fdddfjsn273cf372e332',
          'x-rapidapi-host': 'lexper.p.rapidapi.com'
        }
      };

      const res = await axios.request(options);

      const art = res.data.article;
      let cID;
      //TODO: Fix ctx.send used twice
      try { 
        const contentToAdd = await strapi.query('Content').create({text: art.text, html: art.html, owner: ctx.state.user.id});
        ctx.send(JSON.stringify(contentToAdd));
        cID = JSON.parse(ctx.response.body).id;
      } catch (error) {
        console.error(error);
      }

      try {
        const articleToAdd = await strapi.query('Articles').create({
          raw     : res.data,
          title   : art.title,
          summary : art.summary,
          coverUrl: art.image,
          url     : art.url,
          isRead  : false,
          owner   : ctx.state.user.id,
          content : cID
        });

        ctx.send(JSON.stringify(articleToAdd));
      } catch (error) {
        console.error(error);
      }
    }
  }
};
