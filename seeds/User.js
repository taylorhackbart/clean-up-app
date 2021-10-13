const {User} = require("../models/users");

const userData = [
  {
    name: "John Doe",
    username: "JohnDoe",
    email: "john@example.com"
  },
  {
    name: "Jane Doe",
    username: "JaneDoe",
    email: "jane@example.com"
  }
]

const userSeed = () => User.bulkCreate(userData)

module.exports = userSeed