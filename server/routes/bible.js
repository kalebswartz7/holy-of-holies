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
router.get('/bibles/:bibleId/books/:bookId', function(req, res) {
  bibleId = req.params['bibleId'];
  bookId = req.params['bookId'];
  var apiResult = api.getBook(bibleId, bookId);
  res.send("Book fetched!");
})

 /*
  Call to create / update the books.json file that holds all the book data
  including book ids 
 */
router.get('/bibles/:bibleId', function(req, res) {
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
router.get('/books/:bookEntry', function(req, res) {
  entry = req.params['bookEntry'];
  var apiResult = api.getBooksAndChapters(entry);
  res.send('Got chapters');
})

router.get('/bibles/:bibleId/chapters/:chapterId', function(req, res) {
  bibleId = req.params["bibleId"];
  bookId = req.params["bookId"];
  chapterId = req.params["chapterId"];

  var apiResult = api.getChapter(bibleId, bookId, chapterId);
  res.send('Got chapter');

}); 

module.exports = router;


