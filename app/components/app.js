/** @jsx React.DOM */

var React = require('react');
var NavBar = require('./nav-bar');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="application">
        <NavBar />
        {this.props.activeRoute}
      </div>
    );
  }
});
