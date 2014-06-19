/** @jsx React.DOM */

var React = require('react');
var ReactRouter = require('react-nested-router');
var Link = ReactRouter.Link;
var store = require('../store');
var SearchForm = require('./search-form');
var Search = require('./search');
var Spin = require('./spin');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      parksLoaded: false,
      parks: []
    }
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
    window.location = 'search?q='+filterText;
  },

  renderIndex: function() {
    return <Search onSearchSubmit={this.handleSubmit} />
  },

  render: function() {
    if (!this.props.query.q) return this.renderIndex();
    return (
      <div className="results-page">
        <div className="header">
          <div className="container">
            <SearchForm
              query={this.props.query.q}
              onSearchSubmit={this.handleSubmit}
            />
          </div>
        </div>
        <div className="container">
          <div className="sort-bar">
            <h3>{this.state.parks.length} results found.</h3>
          </div>
          <ParkList data={this.state.parks} loading={!this.state.parksLoaded} />
        </div>
      </div>
    );
  }
});

var ParkList = React.createClass({
  render: function() {
    var parks = this.props.data.map(function(park) {
      var href = '/parks/'+park.PropertyID;
      return <li><h3><Link to="park" parkId={park.PropertyID}>{park.Property}</Link></h3></li>
    });
    if (this.props.loading) return <Spin />
    return <ul className="park-list">{parks}</ul>
  }
});
