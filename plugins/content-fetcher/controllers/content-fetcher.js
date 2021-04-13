'use strict';

console.log(strapi.config);
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
      var options = {
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
      console.log(res);
      const art = res.data.article;
      try {
        await strapi.query('Articles').create({
          raw     : res.data,
          text    : art.text,
          title   : art.title,
          content : art.html,
          summary : art.summary,
          coverUrl: art.image,
          url     : art.url,

          isRead  : false
        });
      } catch (error) {
        console.error(error);
      }
      ctx.response.status = 200;
      ctx.send('Ok');
      return;
    }
  }
};
