/** @jsx React.DOM */

var React = require('react');
var NavBar = require('./nav-bar');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <NavBar />
        <div className="container">
          {this.props.activeRoute}
        </div>
      </div>
    );
  }
});
