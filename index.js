const express = require('express');
const handleMessage = require('./src/handleMessage');

const app = express();

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.post('/', handleMessage);

app.listen(8100, function() {
  console.log('App listening on port 8100.');
});
