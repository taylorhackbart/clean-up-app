const express = require("express");
const morgan = require("morgan")
const mongoose = require("mongoose")
const app = express()
const PORT = process.env.PORT || 3001;
require("dotenv").config()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use(cors())
app.use(morgan("dev"))

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});