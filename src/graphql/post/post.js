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

  randomPostResolver: ({ strapi }) => {
    return {
      typeDefs: `
  
        type PostData {
          data: PostEntity!
        }
  
        type Query {
          getRandomPost: PostData
        }
      `,
  
      resolvers: {
        Query: {
          getRandomPost: {
            resolve: async (parent, args, context) => {
              const { toEntityResponse } = strapi.service(
                "plugin::graphql.format"
              ).returnTypes;
  
              const transformArgs = strapi.plugin("graphql").service("builders")
                .utils.transformArgs;
              const contentType = strapi.contentTypes["api::post.post"];
              const transformedArgs = transformArgs(args, { contentType });
              const data = await strapi.services["api::post.post"].find(
                transformedArgs
              );
  
              function getRandomItem(arr) {
                return arr[Math.floor(Math.random() * arr.length)];
              }
  
              const response = toEntityResponse(data, {
                transformedArgs,
                resourceUID: contentType.uid,
              });
  
              const randomPost = getRandomItem(data.results);
  
              return { data: randomPost, meta: response.value };
            },
          },
        },
      },
  
      resolversConfig: {
        "Query.getRandomPost": {
          auth: false,
        },
      },
    };
  },
};
