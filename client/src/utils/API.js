import axios from 'axios'
// import unirest from 'unirest'
const Documenu = require('documenu')
Documenu.configure('bcb40ab2176a132bfd9edbb6a9ec74ee')

export default {
  saveUser: function(userData) {
    return axios.post("/api/user", userData)
  },
  getUser: function(){
    return axios.get("/api/user")
  },
  getRestaurant: function(data){

    return axios.get("https://api.documenu.com/v2/restaurants/zip_code/" + data + "?size=100&key=bcb40ab2176a132bfd9edbb6a9ec74ee" )
},
postToken: function(data, header) {
  return axios.post("/api/user/tokenIsValid", data, header)
},
//Grabs encrypted password and matches for login approval
loginUser: function (data){
  return axios.post("/api/user/login", data)
},
//Creates new user
createUser: function (data){
  return axios.post("/api/user/register", data)
},
//Gets all users
getUser: function() {
  return axios.get("/api/user/register")
},
//Gets user by ID
getUserById: function(id) {
  return axios.get("/api/user/register/" + id)
},
getUsers: function(data) {
  return axios.get("/api/user", data)
},
}