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
 * API file for interacting with Google Datastore
 */
const Datastore = require('./config/schema.js');

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
const diffAPI = require('./helpers/diffAPI.js');
const engine = require('./helpers/engine.js');

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
  app.get("/ticker",  );
  */

  /**
   * Use this route as a test route before pushing code to upstream. 
   * ALWAYS HAVE THIS COMMENTED OUT BEFORE PUSHING.
   */
app.get("/test", async (req, res) => {
  var c = await engine.extractCoreDoc('https://www.sec.gov/Archives/edgar/data/320193/000032019317000070/a10-k20179302017.htm#s2580FABA87865BC3AA85349AC36B2144', 'https://www.sec.gov/Archives/edgar/data/320193/000119312515356351/d17062d10k.htm')
  res.end(JSON.stringify(c))  
})

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
