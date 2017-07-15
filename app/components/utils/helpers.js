// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");
var _ = require('lodash');

// var resultCache = {}; // cache example

// Helper functions for making API Calls
var helper = {
  // This function serves our purpose of running the query to geolocate.
  runQuery: function(articleSearch, callback) {
    // example caching //
    /*
    if (resultCache[articleSearch.term]) {  
      callback(esultCache[articleSearch.term]);
      return;
    }
    */

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
        console.log(response.json.results); // array of objects
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
          info["title"] = article.name; // ths is the name
          //"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAA6FAsQO0PNJa2dfJ_9dr60l5I4IODZUK-SgrP9CwIUmSShf4lanExOWahs0rp5KhN7_5wkV1EeCWw58BEFB-ZZPekt3GBCvG8SX9mnEz_fj0jPFlqN5dFG8jSnYmotIgyEhAx6EGmKV_DkoE3A_kdeOXvGhSdgtcn0mnt_zeQcx0cATisJpldbA&key=AIzaSyBgo7aeUai60b0KOejPs8gaedWzo7TRN4M"
          info["url"] = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + article.photos[0].photo_reference + "&key=AIzaSyBgo7aeUai60b0KOejPs8gaedWzo7TRN4M";
          fetchResult.push(info);
        }
        console.log('fetchResult: ', fetchResult);
      }
      // If we don't get any results, return an empty array
      
      /*
      //// TEST PHOTO API 1 ////
      // let callbackAfter = _.after(fetchResult.length, callback);
      // let callbackAfter = _.after(2, callback);
      // for (let article of fetchResult) {
      var i = 0;
      for (let article of response.json.results) {
        console.log('i 1 ', i);
        console.log('in second for loop');
        console.log('i 2 ', i);
        if (i === 0) {
          console.log('in second for loop if state');
          googleMapsClient.places({
            photoreference: artcile.photos[0].photo_reference,
          }, function (err, response) {
            console.log('second api', response.json.results);

            // article.details = response;
            // resultCache[articleSearch.term] = fetchResult;
            
            // callbackAfter(fetchResult);
          });
        }
        i++;

        // callback(fetchResult);

      }
      //// TEST PHOTO API 1 ////
      */


      //// TEST PHOTO API 2 ////
      /*
      var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
      queryURL += '?' + $.param({
        'api-key': "00d645b07a35494e941fadda832487af",
        'q': articleSearch.term,
        'begin_date': articleSearch.begin_date + "0101",
        'end_date': articleSearch.end_date + "0101"
      });
      */
      /*
      var queryURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAA6FAsQO0PNJa2dfJ_9dr60l5I4IODZUK-SgrP9CwIUmSShf4lanExOWahs0rp5KhN7_5wkV1EeCWw58BEFB-ZZPekt3GBCvG8SX9mnEz_fj0jPFlqN5dFG8jSnYmotIgyEhAx6EGmKV_DkoE3A_kdeOXvGhSdgtcn0mnt_zeQcx0cATisJpldbA&key=AIzaSyBgo7aeUai60b0KOejPs8gaedWzo7TRN4M"
      // return axios.get(queryURL).then(function(response) {
      axios.get(queryURL).then(function(response) {
        // If get get a result, return that result's formatted address property
        //  console.log(response.json.results); // array of objects
        console.log(response);

        let fetchResult = [];
        if (response.data.response.docs[0]) {
          for (let article of response.data.response.docs) {
            let info = {};
            info["title"] = article.headline.main;
            info["pub_date"] = article.pub_date;
            info["url"] = article.web_url;
            info["snippet"] = article.snippet;
            info["art_id"] = article._id;
            fetchResult.push(info);
          }
        }
        // If we don't get any results, return an empty array
        return fetchResult;
        

      })
      .catch(err => {
        console.log(`Error: ${ err }`)
      })
      */
      //// TEST PHOTO API 2 ////


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
