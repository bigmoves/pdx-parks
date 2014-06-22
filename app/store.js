var $ = require('jquery');

var api = 'http://localhost:3000/api';

var cache = {
  loaded: false,
  records: [],
  map: {}
};

function findQuery(collection, query, offset, cb) {
  var offsetParam = offset ? '&offset='+offset : '';
  $.ajax(api+'/'+collection+'/search?q='+query+offsetParam)
  .then(function(results) {
    cb(results);
  });
}

function find(collection, id, cb) {
  $.ajax(api+'/'+collection+'/'+id)
  .then(function(result) {
    cb(result);
  });
}

exports.find = find;
exports.findQuery = findQuery;
