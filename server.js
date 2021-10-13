const express = require("express");
const morgan = require("morgan")
const app = express()
const sequelize = require("./config/connection")
const PORT = process.env.PORT || 3001;
require("dotenv").config()
const cors = require("cors")

app.use(express.urlencoded({ extended: false}))
app.use(express.json())

app.use(express.static("public")); 

app.use(cors())
app.use(morgan("dev"))

const db = require("./models")
const routes = require("./routes")
app.use(routes)

db.sequelize.sync({force: true}).then(() => {
  app.listen(PORT, () => console.log("Now listening on PORT " + PORT))
})