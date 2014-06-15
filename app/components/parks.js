/** @jsx React.DOM */

var React = require('react');
var store = require('../store');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      parksLoaded: false,
      parks: []
    }
  },

  componentDidMount: function() {
    store.findQuery('parks', '*', this.setStateAfterParks);
  },

  setStateAfterParks: function(parks) {
    this.setState({
      parksLoaded: true,
      parks: parks
    });
  },

  handleSearchSubmit: function(filterText) {
    this.setState({parksLoaded: false});

    if (filterText === '')
      return store.findQuery('parks', '*', this.setStateAfterParks);

    store.findQuery('parks', 'value.Property:"'+filterText+'"',
                    this.setStateAfterParks);
  },

  render: function() {
    return (
      <div>
        <h1>Portland Parks</h1>
        <SearchForm onSearchSubmit={this.handleSearchSubmit} />
        <ParkList data={this.state.parks} loading={!this.state.parksLoaded}/>
      </div>
    );
  }
});

var ParkList = React.createClass({
  render: function() {
    var parkNodes = this.props.data.map(function(park) {
      return <li><a href={"/parks/"+park.PropertyID}>{park.Property}</a></li>
    });
    if (this.props.loading) return <div>Loading...</div>
    return <ul>{parkNodes}</ul>
  }
});

var SearchForm = React.createClass({
  handleSubmit: function() {
    this.props.onSearchSubmit(
      this.refs.filterTextInput.getDOMNode().value
    );
    return false;
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          ref="filterTextInput"
        />
      </form>
    );
  }
});

