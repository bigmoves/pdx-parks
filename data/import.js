// https://gist.github.com/asamiller/9497032
var db = require('orchestrate')('70d86367-d0c8-4019-825a-ddae55733ae0');
var rsvp = require('rsvp');
var parks = require('./parks');

function saveRecord(record) {
  var key = record.PropertyID;
  var json = {};

  //clean-up json
  for (var prop in record) {
    if (typeof record[prop] === 'string') {
      var str = record[prop].trim();
      json[prop] = str;
    } else {
      json[prop] = record[prop];
    }
  }

  return db.put('parks', key, json)
  .then(function () {
    console.log('Saved: ', key);
  });
};

parks.forEach(saveRecord);
