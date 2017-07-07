// google TextSearchTest
// https://www.npmjs.com/package/googleplaces
/*
Enable Google Places API on Google API Console
  Create an app
  Enable the Places API
  Create credentials

npm install googleplaces

# set environment variables
export GOOGLE_PLACES_API_KEY = "your key here"
export GOOGLE_PLACES_OUTPUT_FORMAT = "json"

*/

/* 
(function () {
    "use strict";

    var assert = require("assert");

    var TextSearch = require("../lib/TextSearch.js");
    var config = require("./config.js");

    var textSearch = new TextSearch(config.apiKey, config.outputFormat);

    var parameters = {
        query: "restaurants in dublin"
    };

    textSearch(parameters, function (error, response) {
        if (error) throw error;
        assert.notEqual(response.results.length, 0, "Text search must not return 0 results");
    });

})();
*/