// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Geocoder API
var geocodeAPI = "35e5548c618555b1a43eb4759d26b260";

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(location) {

    //////////////////////////////////////////////
    //// google API ///
    /// note: google search api doesn't work on the client-side trying a different technique on server side via NODE.js

    // Figure query1 location id returned
    // https://maps.googleapis.com/maps/api/place/textsearch/json?query=attractions+Sydney&key=AIzaSyBgo7aeUai60b0KOejPs8gaedWzo7TRN4M
    // var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=attractions" + location + "&key=" + key; // attractions results
    // var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants" + location + "&pretty=1&key=" + key; // restaurants results
    
    // Figure query2 using location id get location details
    // https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=AIzaSyBgo7aeUai60b0KOejPs8gaedWzo7TRN4M
    // var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants" + location + "&pretty=1&key=" + key;
    //////////////////////////////////////////////

    console.log(location);

    // Figure out the geolocation
    var queryURL = "http://api.opencagedata.com/geocode/v1/json?query=" + location + "&pretty=1&key=" + geocodeAPI;
    return axios.get(queryURL).then(function(response) {
      // If get get a result, return that result's formatted address property
      if (response.data.results[0]) {
        console.log(response.data.results[0]);
        return response.data.results[0].formatted;
      }
      // If we don't get any results, return an empty string
      return "";
    });
  },

  // This function hits our own server to retrieve the record of query results
  getHistory: function() {
    return axios.get("/api");
  },

  // This function posts new searches to our database.
  postHistory: function(location) {
    return axios.post("/api", { location: location });
  }
};

// We export the API helper
module.exports = helper;
