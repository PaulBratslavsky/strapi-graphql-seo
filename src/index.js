'use strict';
const { Configuration, OpenAIApi } = require("openai");

function configureOpenAi(apiKey) {
  const configuration = new Configuration({ apiKey: apiKey });
  return new OpenAIApi(configuration);
}



const { postsExtendResolver, randomPostResolver } = require('./graphql/post/post');
const { authorBioByIdResolver } = require('./graphql/author/author');

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    // extending graphql plugin
    const extensionService = strapi.plugin("graphql").service("extension");
    extensionService.use(postsExtendResolver);
    extensionService.use(randomPostResolver);
    extensionService.use(authorBioByIdResolver);

    // initialize openai and set it to strapi context
    console.log('Initializing Open AI');
    strapi.openai = configureOpenAi(process.env.OPENAI_API_KEY);


  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) { 
    if ('openai' in strapi) console.log('Open AI is ready');
  },
};
