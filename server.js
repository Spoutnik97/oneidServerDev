const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./api/routes'); // importing route

app.use('/api', routes.routeApi(express.Router()));
routes.routeStd(app); // register the route

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

const port = process.env.PORT || 6000;
app.listen(port);
console.log(`App is listening on port ${port}`);
