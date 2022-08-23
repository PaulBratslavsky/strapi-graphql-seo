module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/page/find-by-slug/:slug', 
      handler: 'api::page.page.findBySlug',
    },
  ]
};