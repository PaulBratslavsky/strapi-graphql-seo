module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/post-group/find-by-slug/:slug', 
        handler: 'api::post-group.post-group.findBySlug',
      },
    ]
  };