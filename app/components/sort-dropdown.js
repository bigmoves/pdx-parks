/** @jsx React.DOM */

var React = require('react');
require('../../public/dropdown.js');

module.exports = React.createClass({

  getInitialState: function() {
    return { selected: 'Best Match' };
  },

  onChange: function(option) {
    this.setState({ selected: option });
  },

  size: {
    smaller: 'btn-group btn-group-xs',
    small: 'btn-group btn-group-sm',
    large: 'btn-group'
  },

  render: function() {
    var _this = this;
    var style = this.size[this.props.size];
    var options = this.props.options.map(function(option) {
      return <Option name={option} whenClicked={_this.onChange}/>
    });
    return (
      <div className={style || 'btn-group'}>
        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
          Sort: <b>{this.state.selected}</b> <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" role="menu">
          {options}
        </ul>
      </div>
    );
  }
});

var Option = React.createClass({
  handleClick: function() {
    this.props.whenClicked(this.props.name);
    return false;
  },

  render: function() {
    return (
      <li><a href="#" onClick={this.handleClick}>{this.props.name}</a></li>
    );
  }
});
