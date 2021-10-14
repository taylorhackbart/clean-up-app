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
}
}