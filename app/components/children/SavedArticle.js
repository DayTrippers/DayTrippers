// Include React
var React = require("react");
// helpers api
var helpers = require("../utils/helpers");

// This is the History component. It will be used to show a log of  recent searches.
var SavedArticle = React.createClass({

  getInitialState: function() {
    return { result:[] };
  },

  handleDelete: function(event) {
    event.preventDefault();
    this.props.handleDeleteSavedArticle(this.props.savedArticleInfo);
  },

  // Here we describe this component's render method
  // article info prop from main related to returned results
  render: function() {
    return (  
      <div>
        <a target="_blank" href={this.props.savedArticleInfo.url}>{this.props.savedArticleInfo.title}</a>
        &nbsp;•&nbsp; {/* Saved Date {this.props.savedArticleInfo.date.substring(0,10)} */}
        <button onClick={this.handleDelete} className="btn btn-default btn-xs pull-right">Delete</button>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = SavedArticle;