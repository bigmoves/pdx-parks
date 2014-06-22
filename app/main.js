/** @jsx React.DOM */

require('./styles/styles.scss');
require('script!../vendor/jquery/dist/jquery.js');
require('script!../vendor/spin.js/spin.js');

var ReactRouter = require('react-nested-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Search = require('./components/search');
var Results = require('./components/results');
var Park = require('./components/park');
var App = require('./components/app');

Router.useHistory();

Router(
  <Route handler={App}>
    <Route name="search" path="/search" handler={Results} />
    <Route name="park" path="/parks/:parkId" handler={Park} />
  </Route>
).renderComponent(document.body);
