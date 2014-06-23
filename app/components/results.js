/** @jsx React.DOM */

var React = require('react');
var ReactRouter = require('react-nested-router');
var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var store = require('../store');
var SearchForm = require('./search-form');
var Search = require('./search');
var Spin = require('./spin');
var SortDropdown = require('./sort-dropdown');
var Pagination = require('./pagination');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      parksLoaded: false,
      parks: [],
      count: 0
    };
  },

  componentDidMount: function() {
    var query = this.props.query.q;
    var page = this.props.query.p;
    var filter = this.props.query.f;
    var offset = (this.props.query.p * 10) - 10;

    if (!page || page === 1)
      offset = 0;

    if (query)
      store.findQuery('parks', query, offset, filter, this.setStateAfterParks);
  },

  setStateAfterParks: function(payload) {
    this.setState({
      parksLoaded: true,
      parks: payload.parks,
      count: payload.count
    });
  },

  handleSubmit: function(query, filter) {
    if (filter) {
      window.location.href = 'search?q='+query+'&f='+filter;
    } else {
      window.location.href = 'search?q='+query;
    }
  },

  handleFilter: function(filter) {
    var query = this.props.query.q;
    var page = this.props.query.p;

    var queryParam = (query ? 'q='+query : '');
    var pageParam = (page ? '&p='+page : '');
    var filterParam = (filter ? '&f='+filter : '');

    window.history.replaceState({}, '', 'search?'+queryParam+pageParam+filterParam);
  },

  renderIndex: function() {
    return <Search onSubmit={this.handleSubmit} />
  },

  renderSortBar: function() {
    var options = ["Best Match", "Most Popular"];

    if (this.state.count) {
      return (
        <div className="sort-bar clearfix">
          <h3>{this.state.count} results found.</h3>
          <div className="sort-dropdown">
            <SortDropdown
              size="smaller"
              title="Filter"
              options={options}
            />
          </div>
        </div>
      );
    }
  },

  renderParkList: function() {
    var notFoundMsg = "We couldn't find anything matching '"+
                      this.props.query.q+"'";

    if (!this.state.parksLoaded)
      return <Spin />
    if (!this.state.parks.length)
      return <div className="well not-found"><b>{notFoundMsg}</b></div>

    return (
      <div>
        <ParkList data={this.state.parks} />
        <Pagination
          page={this.props.query.p}
          count={this.state.count}
          query={this.props.query.q}
          filter={this.props.query.f}
        />
      </div>
    );
  },

  render: function() {
    if (!this.props.query.q)
      return this.renderIndex();

    return (
      <div>
        <div className="search">
          <SearchForm
            query={this.props.query.q}
            filter={this.props.query.f}
            onSubmit={this.handleSubmit}
            onFilter={this.handleFilter}
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
