// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var History = require("./children/History");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

var googleHelperPlaces = require("./utils/APItextSearch4"); // call it on line 41 replace helpers
// googleHelper.runQuery();

var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBgo7aeUai60b0KOejPs8gaedWzo7TRN4M'
});

// Creating the Main component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  // Note how we added in this history state variable
  getInitialState: function() {
    return { searchTerm: "", results: "", history: [] };
  },

  // The moment the page renders get the History
  componentDidMount: function() {
    // Get the latest history.
    helpers.getHistory().then(function(response) {
      console.log(response);
      if (response !== this.state.history) {
        console.log("History", response.data);
        this.setState({ history: response.data });
      }
    }.bind(this));
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function() {
    // Run the query for the address
    // window.s = googleHelperPlaces.runQuery(this.state.searchTerm)
    // console.log("type", typeof googleHelperPlaces.runQuery(this.state.searchTerm))
    console.log(typeof googleMapsClient.geocode,'hfsfsd')
    var data;

    /*
    // Geocode an address with a promise
    googleMapsClient.geocode({address: this.state.searchTerm}).asPromise().then((response) => {
        console.log(response.json.results);
        data = response.json.results[0].name;
        // console.log("results " + this.state.results);
        console.log("be SF", data);
        console.log("results " + this.state.results);
        if (data !== this.state.results) {
          console.log("Address", data);
          this.setState({ results: data });

          // After we've received the result... then post the search term to our history.
          helpers.postHistory(this.state.searchTerm).then(function() {
            console.log("Updated!");

            // After we've done the post... then get the updated history
            helpers.getHistory().then(function(response) {
              console.log("Current History", response.data);

              console.log("History", response.data);

              this.setState({ history: response.data });

            }.bind(this));
          }.bind(this));
        }

      })
      .catch((err) => {
        console.log(err);
      });
      */

    
    googleMapsClient.places({
      query: this.state.searchTerm
      // address: '1600 Amphitheatre Parkway, Mountain View, CA'
    }, function(err, response) {
      if (!err) {
        console.log("google!!!", response.json.results[0].name);
      }
      


      data = response.json.results[0].name;
      // console.log("results " + this.state.results);
      console.log("be SF", data);
      console.log('THIS: ', this);
      console.log("results ", this.state.results);
      if (data !== this.state.results) {
        console.log("Address", data);
        this.setState({ results: data });

        // After we've received the result... then post the search term to our history.
        googleHelperPlaces.postHistory(this.state.searchTerm).then(function() {
          console.log("Updated!");

          // After we've done the post... then get the updated history
          googleHelperPlaces.getHistory().then(function(response) {
            console.log("Current History", response.data);

            console.log("History", response.data);

            this.setState({ history: response.data });

          }.bind(this));
        }.bind(this));
      }

    }.bind(this));
    

    // googleMapsClient.geocode({address: '1600 Amphitheatre Parkway, Mountain View, CA'}).asPromise().then(function(data) {
      // console.log("be SF", data);
      // if (data !== this.state.results) {
      //   console.log("Address", data);
      //   this.setState({ results: data });

      //   // After we've received the result... then post the search term to our history.
      //   helpers.postHistory(this.state.searchTerm).then(function() {
      //     console.log("Updated!");

      //     // After we've done the post... then get the updated history
      //     helpers.getHistory().then(function(response) {
      //       console.log("Current History", response.data);

      //       console.log("History", response.data);

      //       this.setState({ history: response.data });

      //     }.bind(this));
      //   }.bind(this));
      // }
    // }.bind(this));

  },
  // This function allows childrens to update the parent.
  setTerm: function(term) {
    this.setState({ searchTerm: term });
  },
  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">



             
                  <div className="header-content">
                      <div className="inner">
                          <img src="./public/assets/logoWhite2.png" id="logoWhite"/>
                          <h4>Day by Day your Kinda Way</h4>  
                      </div>
                  </div>
                      <img src="./publc/assets/background.jpg" id="video-background"/>
    

            <h2 className="text-center">TEST AGAIN</h2>

            <p className="text-center">
              <em>Lets add this API.</em>
            </p>
          </div>

          <div className="col-md-12">

            <Form setTerm={this.setTerm} />

          </div>

          <div className="col-md-12">

            <Results address={this.state.results} />
          </div>

        </div>

        // <div className="row">
        //   <History history={this.state.history}/>
        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
