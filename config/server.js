module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('', 'https://r.chm.codes:1337'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'e718cec6ff8cfeffa34b3ad699356f85'),
    },
  },
});
