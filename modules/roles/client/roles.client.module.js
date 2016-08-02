(function (app) {
  'use strict';

  app.registerModule('roles', ['core', 'datatables']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('roles.services');
  app.registerModule('roles.routes', ['ui.router', 'roles.services']);
}(ApplicationConfiguration));
