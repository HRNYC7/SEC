const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const errorHandler = require('errorhandler');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const path = require('path');

const router = require('./routes/basic')

/**
 *  App configuration
 */
dotenv.config();

/**
 * API file for interacting with MySQL
 */
//const db = require('./server/config/schema');

const app = express();

/** 
 * Middleware
 */
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// React DIST output folder
app.use(express.static(path.join(__dirname, '../public')));

/**
 * Error Handler. Provides full stack - REMOVE FOR PRODUCTION
 */
app.use(errorHandler());

process.on('unhandledRejection', (r, p) => {
  console.log('Unhandled Rejection at Promise |', p, 'reason:', r);
  // application specific logging, throwing an error, or other logic here
});

/**
 * Import controllers
 */

/**
 * Primary app Routes
 */
app.use(router)

/**
 * TODO : Implement root GET request
 * app.get('/', (req, res) => {})
 */

/**
  * TODO : Implement GET(ticker) request
  * app.get("/ticker", TODO );
  */

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
