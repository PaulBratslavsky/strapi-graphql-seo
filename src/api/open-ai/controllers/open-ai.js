const crypto = require('crypto');

function generateUniqueSlug() {
  const timestamp = Date.now();
  const randomString = crypto.randomBytes(8).toString('hex');
  return `shorts-post-${timestamp}-${randomString}`;
}

module.exports = ({ strapi }) => ({
  async createVideoSummary(ctx) {

    try {
      const { outputFile, format } = await strapi
        .services['api::open-ai.utils']
        .downloadVideoFile(ctx);

      const audioFilePath = await strapi
        .services['api::open-ai.utils']
        .convertVideoToAudio({ videoFilePath: outputFile, format });

      const transcription = await strapi
        .services['api::open-ai.open-ai']
        .openAiRequest({ audioFilePath }, "transcription");

      const content = transcription.text;

      const summary = await strapi
        .services['api::open-ai.open-ai']
        .openAiRequest({ content }, "completion");


        function getTitle(markdownString) {
          const titleRegex = /^#\s+(.+)$/m;
          const match = markdownString.match(titleRegex);
          return match ? match[1] : "";
        }

      const title = getTitle(summary.choices[0].text);
      console.log(title, "title")

      await strapi
        .entityService.create('api::short-post.short-post', {
          data: {
            title: title.trim(),
            slug: generateUniqueSlug(),
            content: summary.choices[0].text,
            publishedAt: new Date(),
          },
        })

      return { data: summary };

    } catch (error) {
      ctx.throw(500, error);
    }
  },

})