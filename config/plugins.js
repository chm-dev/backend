require('dotenv').config()

const {SENDGRID_KEY} = process.env

module.exports = ( { env } ) => ( {
  email: {
    provider       : 'sendgrid',
    providerOptions: {
      apiKey: SENDGRID_KEY
    },
    settings       : {
      defaultFrom   : 'tomek@chm.dev',
      defaultReplyTo: 'tomek@chm.dev',
      testAddress   : 'strapitest@chm.dev'
    }
  }
} );
