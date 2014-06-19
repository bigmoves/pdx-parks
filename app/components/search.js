/** @jsx React.DOM */

var React = require('react');
var ReactRouter = require('react-nested-router');
var Router = ReactRouter.Router;
var SearchForm = require('./search-form');

module.exports = React.createClass({

  handleSearchSubmit: function(filterText) {
    this.props.onSearchSubmit(filterText);
  },

  render: function() {
    return (
      <div className="search-page">
        <div className="container">
          <div className="search">
            <h2><i className="fa fa-tree"></i> Portland Parks</h2>
            <SearchForm onSearchSubmit={this.handleSearchSubmit} />
          </div>
        </div>
      </div>
    );
  }
});
