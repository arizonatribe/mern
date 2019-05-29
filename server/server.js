const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const { createWhitelistMiddleware } = require('cors-helper');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');

const { port, connectionString, env } = require('./config');
const createRoutes = require('./routes');
const { allowCrossDomain } = require('./middleware');
const corsOptions = createWhitelistMiddleware([ 'localhost', 'locahost:3000' ]);

express()
  .use(allowCrossDomain(env))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use('/api', createRoutes(connectionString))
  // .use(cors(corsOptions))
  .use(compression())
  .use(morgan(env))
  .use(helmet())
  .listen(port, '0.0.0.0', () => console.log(`server is now listening on port ${port}`));
