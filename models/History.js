//OLD Mongoose Schema for Address Finder Assignment//
/*var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HistorySchema = new Schema({
  location: {
    type: String
  },
  date: {
    type: Date
  }
});

var History = mongoose.model("History", HistorySchema);
module.exports = History;*/

//Schema for user input fields

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DayTrippersSchema = new Schema({
  userName: {
    type: String
  },
  userEmail: {
    type: String
  },
  location: {
    type: String
  },
  date: {
    type: Date
  }
});

//DayTrippers is the property name for this schema//
var DayTrippers = mongoose.model("DayTrippers", DayTrippersSchema);
module.exports = DayTrippers;
