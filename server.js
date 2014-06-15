var express = require('express');
var app = express();
var db = require('orchestrate')('70d86367-d0c8-4019-825a-ddae55733ae0');
var port = Number(process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/api/parks/search', function(req, res) {
  var parks, results, query = req.query.q;

  db.search('parks', query)
  .then(function(results) {
    results = results.body.results;
    parks = results.map(function(result) {
      var json = {};
      json = result.value;
      json.id = result.path.key;
      return json;
    });
    res.json(200, parks);
  })
  .fail(function(error) {
    res.json(404, {error: error.body.message});
  });
});

app.get('/api/parks/:id', function(req, res) {
  var park, id = req.params.id;

  db.get('parks', id)
  .then(function(result) {
    park = result.body;
    park.id = id;
    res.json(200, park);
  })
  .fail(function(error) {
    res.json(404, {error: error.body.message});
  });
});

app.get('*', function(req, res, next) {
  res.sendfile('public/index.html');
});

app.listen(port, function() {
  console.log('Listening on ' + port);
});