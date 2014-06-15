/** @jsx React.DOM */

var React = require('react');
var Parks = require('./components/parks');
var Park = require('./components/park');
var page = require('page');

page('/', function() {
  React.renderComponent(<Parks/>, document.body);
});

page('/parks/:id', function(ctx) {
  React.renderComponent(<Park id={ctx.params.id} />, document.body);
});

page();
