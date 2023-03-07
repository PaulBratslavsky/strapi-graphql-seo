module.exports = ({ env }) => ({
    seo: {
      enabled: true,
    },  

    email: {
      config: {
        provider: 'sendgrid', // For community providers pass the full package name (e.g. provider: 'strapi-provider-email-mandrill')
        providerOptions: {
          apiKey: env('SENDGRID_API_KEY'),
        },
        settings: {
          defaultFrom: 'paul@codingafterthirty.com',
          defaultReplyTo: 'paul@codingafterthirty.com',
          testAddress: 'paul@codingafterthirty.com',
        },
      },
    },
    
    upload: {
        config: {
          provider: "cloudinary",
          providerOptions: {
            cloud_name: env("CLOUDINARY_NAME"),
            api_key: env("CLOUDINARY_KEY"),
            api_secret: env("CLOUDINARY_SECRET"),
          },
    
          actionOptions: {
            uploadStream: {
              folder: env("CLOUDINARY_FOLDER"),
            },
    
            delete: {},
          },
        },
      },
});

