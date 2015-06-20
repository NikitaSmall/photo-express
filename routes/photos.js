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

// get photo-upload from
router.get('/upload', function(req, res, next) {
  res.render('photos/upload', { title: 'Upload your favorite picture' });
});

// handle uploaded photo
router.post('/upload', function(req, res, next) {
  var photo = req.files.photo;
  var path = join('/photos', photo.name);
  var name = req.body.photo.name || photo.name;

  // save photo to mongo collection
  Photo.create({
    name: name,
    path: path
  }, function(err) {
    if (err) return next(err);
    res.redirect('/photos');
  });
});

// handle download photo request
router.get('/:id/download', function(req, res, next) {
  var id = req.params.id;
  Photo.findById(id, function(err, photo) {
    if (err) return next(err);

    // send founded file
    var path = join(req.app.get('public_path'), photo.path);
    res.sendFile(path);
  });
});

module.exports = router;
