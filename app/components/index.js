/** @jsx React.DOM */

var React = require('react');
var ReactRouter = require('react-nested-router');
var Router = ReactRouter.Router;

module.exports = React.createClass({
  componentDidMount: function() {
    Router.replaceWith('search');
  },
  render: function() {
    return <div />
  }
});
