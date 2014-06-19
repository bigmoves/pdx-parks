/** @jsx React.DOM */

var React = require('react');
var store = require('../store');
var Spin = require('./spin');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      loaded: false,
      park: {}
    };
  },

  componentDidMount: function() {
    store.find('parks', this.props.params.parkId, this.setStateAfterFind);
  },

  setStateAfterFind: function(park) {
    this.setState({ loaded: true, park: park });
  },

  renderAmenitities: function() {
    var amenities = this.state.park.amenities;
    return amenities && amenities.map(function(item) {
      return <li>{item}</li>
    });
  },

  render: function() {
    if (!this.state.loaded) {
      return <Spin />
    }
    var park = this.state.park;
    return (
      <div>
        <h1>{park.Property}</h1>
        <h2>{park.Address}</h2>
        <ul>
          {this.renderAmenitities()}
        </ul>
      </div>
    );
  }
});
