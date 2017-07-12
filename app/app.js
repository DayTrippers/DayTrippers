// Include the Main React Dependencies
var React = require("react");
var ReactDOM = require("react-dom");

// Include the main Main Component
var Main = require("./components/Main");

// This code here allows us to render our main component (in this case Main)
ReactDOM.render(<Main />, document.getElementById("app"));

/*
fyi if you receive the following error: ‘’' ERROR in ./app/app.js
Module build failed: Error: Using `babel-preset-react-app` requires that you specify `NODE_ENV` or `BABEL_ENV`
*/
// export NODE_ENV=development
// export BABEL_ENV=$NODE_ENV