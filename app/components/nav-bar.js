/** @jsx React.DOM */

var React = require('react');

var NavBar = React.createClass({
  render: function() {
    return (
      <div className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <a href="/" className="navbar-brand">PDX Parks</a>
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <div className="nav-collapse collapse navbar-responsive-collapse">
            <ul className="nav navbar-nav">
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = NavBar;
