"use strict"; 

var Nightmare = require("nightmare");

var nightmare = Nightmare({ show: true });

nightmare
  .goto("http://#.com")
  .type("form[action*='/search'] [name=p]", "github nightmare")
  .click("form[action*='/search'] [type=submit]")
  .wait("#main")
  .evaluate(function() {
    return document.querySelector("#main .searchCenterMiddle li a").href;
  })
  .end()
  .then(function(result) {
    console.log(result);
  })
  .catch(function(error) {
    console.error("Search failed:", error);
  });