var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String
  },
  url: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
/*
  title: {
    type: String
  },
  snippet: {
    type: String
  },
  url: {
    type: String
  },
  pub_date: {
    type: Date
  },
  date: {
    type: Date,
    default: Date.now
  },
  art_id: {
    type: String
  }
  */
});

var Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
