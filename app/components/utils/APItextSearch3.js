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

/*
var Promise = require('q').Promise;

var arrayContaining = jasmine.arrayContaining;
var objectContaining = jasmine.objectContaining;
var stringMatching = jasmine.stringMatching;
*/

var googleHelper = {
  runQuery: function(queryText) {
    var googleMapsClient = require('@google/maps').createClient({
      key: 'AIzaSyBgo7aeUai60b0KOejPs8gaedWzo7TRN4M'
    });

    // Geocode an address.
    /*
    googleMapsClient.geocode({
      address: '1600 Amphitheatre Parkway, Mountain View, CA'
    }, function(err, response) {
      if (!err) {
        console.log("these are results yo")
        console.log(response.json.results);
      }
    });
    */

    // Geocode an address.
    googleMapsClient.places({
      query: queryText,
      // language: 'en',
      // location: [-33.865, 151.038],
      // radius: 5000,
      // minprice: 1,
      // maxprice: 4,
      // opennow: true,
      // type: 'restaurant'
    }, function(err, response) {
      if (!err) {
        console.log("these are results 2 yo")
        console.log(response.json.results);
      }
    });

    /*
    // google testing scenarios

    describe('places client library', function() {
      var googleMaps = require('./service');

      it('gets places for a text search query', function(done) {
        googleMaps.places({
          query: 'fast food',
          language: 'en',
          location: [-33.865, 151.038],
          radius: 5000,
          minprice: 1,
          maxprice: 4,
          opennow: true,
          type: 'restaurant'
        })
        .asPromise()
        .then(function(response) {
          expect(response.json.results).toEqual(
              arrayContaining([
                objectContaining({
                  name: stringMatching('McDonalds')
                })
              ]));
        })
        .then(done, fail);
      });

      it('gets places for a nearby search query', function(done) {
        googleMaps.placesNearby({
          language: 'en',
          location: [-33.865, 151.038],
          radius: 5000,
          minprice: 1,
          maxprice: 4,
          opennow: true,
          type: 'restaurant'
        })
        .asPromise()
        .then(function(response) {
          expect(response.json.results).toEqual(
              arrayContaining([
                objectContaining({
                  name: stringMatching('McDonalds')
                })
              ]));
        })
        .then(done, fail);
      });

      it('gets places for a nearby search query ranked by distance', function(done) {
        googleMaps.placesNearby({
          language: 'en',
          location: [-33.865, 151.038],
          rankby: 'distance',
          minprice: 1,
          maxprice: 4,
          opennow: true,
          type: 'restaurant'
        })
        .asPromise()
        .then(function(response) {
          expect(response.json.results).toEqual(
              arrayContaining([
                objectContaining({
                  name: stringMatching('McDonalds')
                })
              ]));
        })
        .then(done, fail);
      });

      it('gets places for a radar search query', function(done) {
        googleMaps.placesRadar({
          language: 'en',
          location: [-33.865, 151.038],
          radius: 5000,
          type: 'restaurant'
        })
        .asPromise()
        .then(function(response) {
          expect(response.json.results).toEqual(
              arrayContaining([
                objectContaining({
                  place_id: stringMatching('ChIJCYxmm6G8EmsRKx_g00QBeBk')
                })
              ]));
        })
        .then(done, fail);
      });

      it('can page through results', function(done) {
        googleMaps.places({
          query: 'restaurant',
          language: 'en',
          location: [-33.86746, 151.207090],
          radius: 5000
        })
        .asPromise()
        .then(function(response) {
          expect(response.json.next_page_token).not.toBeFalsy();
          function getNextPage() {
            return googleMaps.places({
              pagetoken: response.json.next_page_token
            }).asPromise();
          }
          return getNextPage()
              .then(function repeatWhileInvalid(nextResponse) {
                if (nextResponse.json.status !== 'INVALID_REQUEST') {
                  return nextResponse;
                }

                // Wait one second, and try again.
                return new Promise(function(resolve) {
                  setTimeout(resolve, 1000);
                })
                .then(getNextPage)
                .then(repeatWhileInvalid);
              });
        })
        .then(function(nextResponse) {
          expect(nextResponse.json.status).toBe('OK');
          expect(nextResponse.json.results.length).not.toBeFalsy();
        })
        .then(done, fail);
      }, 10000);

      it('gets details for a place', function(done) {
        googleMaps.place({
          placeid: 'ChIJc6EceWquEmsRmBVAjzjXM-g',
          language: 'fr'
        })
        .asPromise()
        .then(function(response) {
          expect(response.json.result).toEqual(
              objectContaining({
                name: 'Spice Temple'
              }));
        })
        .then(done, fail);
      });

      it('gets a places photo', function(done) {
        googleMaps.placesPhoto({
          photoreference: 'CnRvAAAAwMpdHeWlXl-lH0vp7lez4znKPIWSWvgvZFISdKx45AwJVP1Qp37YOrH7sqHMJ8C-vBDC546decipPHchJhHZL94RcTUfPa1jWzo-rSHaTlbNtjh-N68RkcToUCuY9v2HNpo5mziqkir37WU8FJEqVBIQ4k938TI3e7bf8xq-uwDZcxoUbO_ZJzPxremiQurAYzCTwRhE_V0',
          maxwidth: 100,
          maxheight: 100
        })
        .asPromise()
        .then(function(response) {
          expect(response.headers['content-type']).toBe('image/jpeg');
        })
        .then(done, fail);
      });

      it('gets autocomplete predictions for places', function(done) {
        googleMaps.placesAutoComplete({
          input: 'pizza',
          language: 'en',
          location: [40.724, -74.013],
          radius: 5000,
          components: {country: 'us'}
        })
        .asPromise()
        .then(function(response) {
          expect(response.json.predictions).toEqual(
              arrayContaining([
                objectContaining({
                  terms: arrayContaining([
                    objectContaining({
                      value: 'NY'
                    })
                  ])
                })
              ]));
        })
        .then(done, fail);
      });

      it('gets autocomplete predictions for a query', function(done) {
        googleMaps.placesQueryAutoComplete({
          input: 'pizza near New York',
          language: 'en',
          location: [40.724, -74.013],
          radius: 5000
        })
        .asPromise()
        .then(function(response) {
          expect(response.json.predictions).toEqual(
              arrayContaining([
                objectContaining({
                  description: 'pizza near New York, NY, United States'
                })
              ]));
        })
        .then(done, fail);
      });

    });
  */
  }
};

// We export the API helper
module.exports = googleHelper;
