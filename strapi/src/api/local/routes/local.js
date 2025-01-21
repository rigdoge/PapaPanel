'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/local/status',
      handler: 'local.status',
    },
    {
      method: 'POST',
      path: '/local/lemp',
      handler: 'local.installLemp',
    },
    {
      method: 'POST',
      path: '/local/monitoring',
      handler: 'local.setupMonitoring',
    },
    {
      method: 'POST',
      path: '/local/site',
      handler: 'local.deploySite',
    }
  ]
}; 