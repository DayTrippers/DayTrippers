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
        <button onClick={this.handleDelete} className="btn btn-default btn-xs pull-right">Delete</button>
        { /* <a target="_blank" href={this.props.savedArticleInfo.url}>{this.props.savedArticleInfo.title}</a> */ }
        <h1>{this.props.savedArticleInfo.title}</h1>
        <img src={this.props.savedArticleInfo.url}></img>
        &nbsp; &nbsp;
{/* Email Plugin is here*/}
         <div>
          <form className="email" action="https://formspree.io/rachel.marie.garcia@gmail.com" method="POST"> 
              <input className="email" type="email" name="email" placeholder="Your email"></input>
              <input type="submit" class="btn btn-xl" value="Send"></input>
          </form>
         </div>



      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = SavedArticle;