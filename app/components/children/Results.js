// Include React
var React = require("react");
// helpers api
var helpers = require("../utils/helpers");

// Creating the Results component
var Results = React.createClass({
  //article info prop from main related to returned results
  handleSaveResult: function() {
    event.preventDefault();
    // helpers.postSaved(this.props.articleInfo).then(function(response) {
    helpers.postSaved(this.props.articleInfo, function(response) { // articleInfo={res} key={i} from main
      console.log("Response=================");
      console.log(this.props.articleInfo);
      this.props.removeResult(this.props.articleInfo.url) //
    }.bind(this))
  },

  handleDeleteResult: function() {
    event.preventDefault();
      this.props.removeResult(this.props.articleInfo.url)
  },

  render: function() {
    return (
      <div className="gallery-box"> {/*WE NEED TO CHANGE THE CSS HERE*/}
        <div className="panel-heading resultHeader ">
          <button onClick={this.handleSaveResult} className="btn btn-default btn-xs pull-right">Save</button>
           &nbsp; &nbsp;
           {/* <a target="_blank" href={this.props.articleInfo.url}>{this.props.articleInfo.title}</a> */}
            <img src={this.props.articleInfo.url}></img>
            <h1>{this.props.articleInfo.title}</h1>
           &nbsp; &nbsp; {/* {this.props.articleInfo.pub_date.substring(0,10)} */}
      </div>
        <div className="panel-body">
          {/* <p>{this.props.articleInfo.snippet}</p> */}
        </div>
      </div>
    )
  }
});

// Export the component back for use in other files
module.exports = Results;
