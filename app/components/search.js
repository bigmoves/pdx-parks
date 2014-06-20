/** @jsx React.DOM */

var React = require('react');
var ReactRouter = require('react-nested-router');
var Router = ReactRouter.Router;
var SearchForm = require('./search-form');

module.exports = React.createClass({

  handleSubmit: function(filterText) {
    this.props.onSubmit(filterText);
  },

  render: function() {
    return (
      <div>
        <h2><i className="fa fa-tree"></i> Portland Parks</h2>
        <SearchForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
});
