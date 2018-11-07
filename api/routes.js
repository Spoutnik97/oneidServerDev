const express = require('express');
const path = require('path');
const controller = require('./controller');

exports.routeStd = function (app) {
  app.use('/public', express.static(path.resolve('public')));
  // app.use('/images', express.static(path.resolve(__dirname + '\\..\\public\\images')));
  app.use('/images', express.static(path.resolve('public/images/')));
  // app.use('/', express.static(__dirname + '\\..\\client'));
  app.use('/public', express.static('public'));
  // app.use(express.static(__dirname + '\\..\\client'));
  app.use(express.static(path.resolve('client')));

  app.route('/public/cgu').get((req, res) => {
    res.sendFile(path.resolve('public/CGU.txt'));
  });

  return app;
};

exports.routeApi = function (apiRoutes) {
  apiRoutes.get('/test', controller.test);
  apiRoutes.post('/test', controller.test);

  return apiRoutes;
};
