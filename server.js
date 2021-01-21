const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require("mongoose")

mongoose.Promise = Promise
mongoose.connect("mongodb://localhost:27017/foodstore")
  .then(() => console.log("Connection Mongo DB"))

const port = process.env.PORT || 4000;
const fruits = require('./fruits');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/fruits', (req, res) => {
  fruits.find(function (err, apis) {
    if (err) return console.error(err);
    
    res.send(apis);
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

process.on('uncaughtException', function (err) {
  console.log(err);
});
