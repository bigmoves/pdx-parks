/** @jsx React.DOM */

var React = require('react');
var store = require('../store');

module.exports = React.createClass({

  handleSubmit: function() {
    this.props.onSearchSubmit(
      this.refs.filterTextInput.getDOMNode().value
    );
    return false;
  },

  render: function() {
    var query = this.props.query;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="searchBar">
          <input
            className="form-control"
            type="text"
            placeholder="Find a park..."
            ref="filterTextInput"
            defaultValue={query}
          />
        </div>
        <button type="submit" className="btn btn-default">Search</button>
      </form>
    );
  }
});

