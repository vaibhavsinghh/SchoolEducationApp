'use strict';

/**
 * Module dependencies
 */
var categoryPolicy = require('../policies/category.server.policy'),
    formsPolicy = require('../policies/forms.server.policy'),
    category = require('../controllers/category.server.controller'),
    forms = require('../controllers/forms.server.controller');

module.exports = function (app) {
  // Category collection routes
  app.route('/api/category').all(categoryPolicy.isAllowed)
    .get(category.list)
    .post(category.create);

// Form collection routes
 app.route('/api/forms').all(formsPolicy.isAllowed)
    .get(forms.list)
    .post(forms.create);

  // Single category routes
 app.route('/api/category/:categoryId').all(categoryPolicy.isAllowed)
    .get(category.read)
    .put(category.update)
    .delete(category.delete);

  // Single form routes
 app.route('/api/forms/:formId').all(formsPolicy.isAllowed)
     .get(forms.read)
     .put(forms.update)
     .delete(forms.delete);

// Finish by binding the category middleware
 app.param('categoryId', category.categoryByID);

 // Finish by binding the form middleware
 app.param('formId', forms.formByID);

app.route('/api/getFormsCatWise/:categoryId').get(forms.getFormsCatWise);
app.route('/api/getForm/:formId').get(forms.getForm);

};
