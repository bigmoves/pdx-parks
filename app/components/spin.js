/** @jsx React.DOM */

var React = require('react');
var $ = require('jquery');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      size: this.props.size
    };
  },

  static: {
    sizes: {
      large: {
        lines: 11,
        length: 6,
        width: 3,
        radius: 7
      },
      small: {
        lines: 10,
        length: 4,
        width: 2,
        radius: 3.5
      }
    }
  },

  componentDidMount: function() {
    var options = {
      lines: 11,
      length: 6,
      width: 3,
      radius: 7,
      corners: 1,
      rotate: 0,
      direction: 1,
      color: "#000",
      speed: .8,
      trail: 61,
      shadow: !1,
      hwaccel: !0,
      className: "spinner",
      zIndex: 1e3,
      top: "auto",
      left: "auto"
    };
    var size = this.static.sizes[this.state.size];
    $.extend(options, size);
    new Spinner(options).spin(this.refs.spinner.getDOMNode());
  },

  render: function() {
    return <div ref="spinner" className="spin"/>
  }
});
