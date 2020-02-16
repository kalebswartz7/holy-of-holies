const express = require("express");
const router = express.Router();
const api = require('../services/api');

router.get('/', function (req, res) {
    //res.send('hello world')
    var apiResult = api.apiTest();
    res.send("Hi");
  })

 /*
  Call to get a specific book with a specific bible translation 
 */
router.get('/bible/:bibleId/books/:bookId', function(req, res) {
  bibleId = req.params['bibleId'];
  bookId = req.params['bookId'];
  var apiResult = api.getBook(bibleId, bookId);
  res.send("Book fetched!");
})

 /*
  Call to create / update the books.json file that holds all the book data
  including book ids 
 */
router.get('/bible/:bibleId', function(req, res) {

  // Block the call since it will need to be made infrequently 
  var block_call = false; 

  bibleId = req.params['bibleId'];
  if (!block_call) {
    var apiResult = api.getBooks(bibleId);
  }
  res.send("Book fetched!");
})

 /*  
  Call to get all chapters for a specific book entry in books.json and update 
  the books.json object with those chapters 
 */
router.get('/book/:bookEntry', function(req, res) {
  entry = req.params['bookEntry'];
  var apiResult = api.getBooksAndChapters(entry);
  res.send('Got chapters');
})

module.exports = router;


