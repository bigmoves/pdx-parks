/** @jsx React.DOM */

var React = require('react');
var ReactRouter = require('react-nested-router');
var Link = ReactRouter.Link;
var store = require('../store');
var SearchForm = require('./search-form');
var Search = require('./search');
var Spin = require('./spin');
var SortDropdown = require('./sort-dropdown');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      parksLoaded: false,
      parks: []
    };
  },

  componentDidMount: function() {
    if (this.props.query.q)
      store.findQuery('parks', this.props.query.q, this.setStateAfterParks);
  },

  setStateAfterParks: function(parks) {
    this.setState({
      parksLoaded: true,
      parks: parks
    });
  },

  handleSubmit: function(filterText) {
    window.location.href = 'search?q='+filterText;
  },

  renderIndex: function() {
    return <Search onSubmit={this.handleSubmit} />
  },

  renderSortBar: function() {
    var options = ["Best Match", "Most Popular"];

    if (this.state.parks.length)
      return (
        <div className="sort-bar clearfix">
          <h3>{this.state.parks.length} results found.</h3>
          <div className="sort-dropdown">
            <SortDropdown
              size="smaller"
              title="Filter"
              options={options}
            />
          </div>
        </div>
      );
  },

  renderParkList: function() {
    var notFoundMsg = "We couldn't find anything matching '"+
                      this.props.query.q+"'";

    if (!this.state.parksLoaded)
      return <Spin />
    if (!this.state.parks.length)
      return <div className="well not-found"><b>{notFoundMsg}</b></div>
    return <ParkList data={this.state.parks} />
  },

  render: function() {
    if (!this.props.query.q)
      return this.renderIndex();

    return (
      <div>
        <div className="search">
          <SearchForm
            query={this.props.query.q}
            onSearchSubmit={this.handleSubmit}
          />
        </div>
        {this.renderSortBar()}
        {this.renderParkList()}
      </div>
    );
  }
});

var ParkListItem = React.createClass({
  render: function() {
    var park = this.props.park;
    return (
      <li className="park-list-item">
        <h3>
          <Link to="park" parkId={park.PropertyID}>{park.Property}</Link>
        </h3>
      </li>
    );
  }
});

var ParkList = React.createClass({
  render: function() {
    var parks = this.props.data.map(function(park) {
      return <ParkListItem park={park} />
    });
    return <ul className="park-list">{parks}</ul>
  }
});
