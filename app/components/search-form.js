/** @jsx React.DOM */

var React = require('react');
var store = require('../store');
var FilterDropdown = require('./filter-dropdown');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      filter: this.props.filter
    };
  },

  handleSubmit: function() {
    this.props.onSubmit(
      this.refs.filterTextInput.getDOMNode().value,
      this.state.filter
    );
    return false;
  },

  handleFilter: function(filter) {
    this.setState({filter: filter});
    this.refs.filterTextInput.getDOMNode().focus();
    this.props.onFilter(filter);
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="search-bar">
          <input
            className="form-control"
            type="text"
            placeholder="Find a park..."
            ref="filterTextInput"
            defaultValue={this.props.query}
          />
        </div>
        <FilterDropdown
          options={[
            {label: "Name", key: "Property"},
            {label: "Address", key: "Address"},
            {label: "Neighborhood", key: "SubArea"},
            {label: "Amenities", key: "amenities"}
          ]}
          filter={this.state.filter}
          handleClick={this.handleFilter}
        />
        <button type="submit" className="btn btn-default">Search</button>
      </form>
    );
  }
});

