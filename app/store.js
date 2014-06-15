var $ = require('jquery');

var api = 'http://localhost:3000/api';

function findQuery(collection, query, cb) {
  $.ajax(api+'/'+collection+'/search?q='+query)
  .then(function(results) {
    cb(results);
  })
};

function find(collection, id, cb) {
  $.ajax(api+'/'+collection+'/'+id)
  .then(function(result) {
    cb(result);
  });
};

exports.find = find;
exports.findQuery = findQuery;
