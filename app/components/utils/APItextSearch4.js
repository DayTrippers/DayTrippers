/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// https://github.com/googlemaps/google-maps-services-js
// steps
// npm install @google/maps

// below specs from the below link
// https://github.com/googlemaps/google-maps-services-js/blob/master/spec/e2e/places-spec.js

// add the following chrome extension: Allow-Control-Allow-Origin
// 


var googleHelperPlaces = {
  runQuery: function(queryText) {
    var googleMapsClient = require('@google/maps').createClient({
      key: 'AIzaSyBgo7aeUai60b0KOejPs8gaedWzo7TRN4M'
    });

    // Geocode an address with a promise
    googleMapsClient.geocode({
      address: queryText
    }).asPromise().then((response) => {
      console.log(response.json.results);
    }).catch((err) => {
      console.log(err);
    });

    // Geocode an address.
    // return googleMapsClient.places({
     // query: queryText,
      // language: 'en',
      // location: [-33.865, 151.038],
      // radius: 5000,
      // minprice: 1,
      // maxprice: 4,
      // opennow: true,
      // type: 'restaurant'
   // }, function(err, response) {
      /*
      if (!err) {
        console.log("these are results 2 yo")
        console.log(response.json.results);
      }
      */
      // console.log("hahahahahah", response.json.results[0].name)
     // return response.json.results[0].name

      // if (response.data.results[0]) {
      //   console.log(response.data.results[0]);
      //   return response.data.results[0].formatted;
      // }
      // // If we don't get any results, return an empty string
      // return "";
    // });

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
module.exports = googleHelperPlaces;
