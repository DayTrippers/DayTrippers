// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(articleSearch, callback) {

    console.log('im in runQuery');
    // npm install @google/maps
    var googleMapsClient = require('@google/maps').createClient({
      key: 'AIzaSyBgo7aeUai60b0KOejPs8gaedWzo7TRN4M'
    });
    // Geocode an address.
    return googleMapsClient.places({
      query: articleSearch.term // .term this is the the form filed the user enters data in
    }, function(err, response) {
      if (!err) {
        console.log('im in api if');
        console.log(response.json.results);
      }

      console.log('im in api function');
      // saving json api to an object called info in the form of data base table
      console.log(response.json.results);
      let fetchResult = [];
      if (response.json.results[0]) {
        console.log('im in json if state');
        for (let article of response.json.results) {
          console.log('im in the for loop');
          let info = {};
          info["title"] = article.name;
          info["url"] = article.photos[0].html_attributions[0];
          fetchResult.push(info);
        }
        console.log('fetchResult: ', fetchResult);
      }
      // If we don't get any results, return an empty array
      
      callback(fetchResult);

    });

  },

  // This function hits our own server to retrieve the record of query results
  getSaved: function() {
    return axios.get("/api"); // doesnt enter main.js 
    // var fetchResult = axios.get("/api"); // asyncrhronis
    // console.log("fetchResult for getSaved in Helper:", fetchResult);
    // callback(fetchResult);
    // callback(axios.get("/api"));
  },

  // This function posts new searches to our database.
  // postSaved: function(obj) {
  postSaved: function(obj, callback) {
    // return axios.post("/api", {
    var fetchResult = axios.post("/api", {

      title: obj.title,
      url: obj.url,
      /*
      title: obj.title,
      snippet: obj.snippet,
      url: obj.url,
      pub_date: obj.pub_date,
      art_id: obj.art_id
      */
    });
    callback(fetchResult);
  },

  deleteSaved: function(id, callback) {
      console.log(id);
      // return axios.post("/api/delete", {
      var fetchResult = axios.post("/api/delete", {
          _id: id
      });
      callback(fetchResult);
  },
};

// We export the API helper
module.exports = helper;
