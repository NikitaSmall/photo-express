var express = require('express');
var router = express.Router();

var photos = [];

photos.push({
  name: 'Node logo',
  path: 'http://nodejs.org/images/logos/nodejs-green.png'
});

photos.push({
  name: 'Ryan Speaking',
  path: 'http://nodejs.org/images/ryan-speaker.jpg'
});

router.get('/', function(req, res, next) {
  res.render('photos/index', {
    title: 'Stock photos exchange',
    photos: photos
    });
});

module.exports = router;
