const express = require("express");
const router = express.Router();
const api = require('../services/api');

router.get('/', function (req, res) {
    //res.send('hello world')
    var apiResult = api.apiTest();
    res.send("Hi");
  })

router.get('/bible/:bibleId/books/:bookId', function(req, res) {
  bibleId = req.params['bibleId'];
  bookId = req.params['bookId'];
  var apiResult = api.getBook(bibleId, bookId);
  res.send("Book fetched!");
})

module.exports = router;


