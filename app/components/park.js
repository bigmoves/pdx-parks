/** @jsx React.DOM */

var React = require('react');
var store = require('../store');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      loaded: false,
      park: {}
    };
  },

  componentDidMount: function() {
    store.find('parks', this.props.id, this.setStateAfterFind);
  },

  setStateAfterFind: function(park) {
    this.setState({ loaded: true, park: park });
  },

  render: function() {
    if (!this.state.loaded) {
      return <div>Loading...</div>
    }
    var park = this.state.park;
    var amenities = park.amenities.map(function(item) {
      return <li>{item}</li>
    });
    return (
      <div>
        <h1>{park.Property}</h1>
        <h2>{park.Address}</h2>
        <ul>
          {amenities}
        </ul>
      </div>
    );
  }
});
