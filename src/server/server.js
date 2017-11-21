const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const morgan = require('morgan');
const path = require('path');
const http = require('http');
const app = express();
const dotenv = require('dotenv');
const { waitTimeJob, weatherJob} = require('./workers/workers');

dotenv.config();


// API file for interacting with MySQL
//const db = require('./server/config/schema');


// Parsers
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

process.on("unhandledRejection", (r, p) => {
    console.log("Unhandled Rejection at Promise |", p, "reason:", r);
    // application specific logging, throwing an error, or other logic here
  });

/**
 * Import controllers
 */
 
/**
 * Primary app Routes
 */

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

