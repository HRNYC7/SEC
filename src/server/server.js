const express = require('express');
const path = require('path');
// const morgan = require('morgan');
const app = express();
app.use(express.static(path.join(__dirname, '../public')));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Listening on port 3000'));
