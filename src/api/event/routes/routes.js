module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/event/find-by-slug/:slug', 
      handler: 'api::event.event.findBySlug',
    },
  ]
};