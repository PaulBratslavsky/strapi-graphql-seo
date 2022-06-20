module.exports = {
  postsExtendResolver: ({ strapi }) => {
    return {
      typeDefs: `
              extend type Query {
                post(slug: ID!): PostEntityResponse
              }
          `,

      resolvers: {
        Query: {
          post: {
            resolve: async (parent, args, context) => {
              const { toEntityResponse } = strapi.service(
                "plugin::graphql.format"
              ).returnTypes;

              const data = await strapi.services["api::post.post"].find({
                filters: { slug: args.slug },
              });

              const response = toEntityResponse(data.results[0]);
              return response;
            },
          },
        },
      },

      // define in UI and disable shadowCRUD
      resolversConfig: {
        "Query.post": {
          auth: false,
        },
      },
    };
  },
};
