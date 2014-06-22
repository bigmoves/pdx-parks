/** @jsx React.DOM */

var React = require('react');

var Option = React.createClass({

  handleClick: function() {
    this.props.whenClicked(this.props.key);
    return false;
  },

  render: function() {
    return (
      <li className={this.props.isActive ? 'active' : ''}>
        <a href="#" onClick={this.handleClick}>{this.props.label}</a>
      </li>
    );
  }
});

module.exports = React.createClass({

  getInitialState: function() {
    return {
      filter: this.props.filter,
      label: ''
    };
  },

  handleClick: function(key) {
    this.setState({filter: key});
    this.props.handleClick(key);
  },

  size: {
    smaller: 'btn-group btn-group-xs',
    small: 'btn-group btn-group-sm',
    large: 'btn-group'
  },

  render: function() {
    var _this = this;
    var btnSize = this.size[this.props.size];
    var style = this.props.style || {paddingRight: '5px'};

    return (
      <div className={btnSize || 'btn-group'} style={style}>
        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
          Filter <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" role="menu">
          {this.props.options.map(function(option) {
            return <Option
                     isActive={_this.state.filter === option.key}
                     label={option.label}
                     key={option.key}
                     whenClicked={_this.handleClick}
                   />
          })}
        </ul>
      </div>
    );
  }
});
