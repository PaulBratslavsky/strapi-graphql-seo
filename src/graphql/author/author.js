module.exports = {
  authorBioByIdResolver: ({ strapi }) => {
    return {
      typeDefs: `

        type AuthorsBioEntity {
            id: ID
            firstName: String
            lastName: String
            bio: String
            avatar: UploadFileEntity
            postCount: Int
        }

        type AuthorsBio {
            data: AuthorsBioEntity
        }
        
        type Query {
            authorsBio( id: ID!): AuthorsBio
        }
    `,

      resolvers: {
        Query: {
          authorsBio: {
            resolve: async (parent, args, context) => {
              const author = await strapi.services[
                "api::author.author"
              ].findOne(args.id, { populate: ["avatar, posts"] });

              if (!author) return { data: null };

              return {
                data: {
                  id: author.id,
                  firstName: author.firstName,
                  lastName: author.lastName,
                  bio: author.bio,
                  postCount: author.posts.length,
                  avatar: author.avatar,
                },
              };
            },
          },
        },
      },

      resolversConfig: {
        "Query.authorsBio": {
          auth: false,
        },
      },
    };
  },
};
