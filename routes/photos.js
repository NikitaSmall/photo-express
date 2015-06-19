var express = require('express');
var router = express.Router();

var Photo = require('../models/photo');
var path = require('path');
var fs = require('fs');
var join = path.join;

// get photo index page (show all photos)
router.get('/', function(req, res, next) {
  Photo.find({}, function(err, photos) {
    if (err) return next(err);
    res.render('photos/index', {
      title: 'Stock photos exchange',
      photos: photos
      });
  });
});

router.get('/upload', function(req, res, next) {
  res.render('photos/upload', { title: 'Upload your favorite picture' });
});

router.post('/upload', function(req, res, next) {
  var photo = req.files.photo;
  var path = join('/photos', photo.name);
  var name = req.body.photo.name || photo.name;

  Photo.create({
    name: name,
    path: path
  }, function(err) {
    if (err) return next(err);
    res.redirect('/photos');
  });
});

module.exports = router;
