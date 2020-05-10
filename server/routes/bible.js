const express = require("express");
const router = express.Router();
const api = require('../services/api');

// Call to populate database from specific translation 
router.get('/populate/:bibleId', function(req, res) {
  bibleId = req.params['bibleId'];
  var apiResult = api.populateMongo(bibleId); 
  res.send("MongoDB Populated");
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


router.get('/bibles/:bibleId/chapters/:chapterId', function(req, res) {
  bibleId = req.params["bibleId"];
  bookId = req.params["bookId"];
  chapterId = req.params["chapterId"];

  var apiResult = api.getChapter(bibleId, bookId, chapterId);
  res.send('Got chapter');

}); 

router.get('/translations', function(req, res) {
  var apiResult = api.getTranslations()
  .then((translations) => {
    res.send(translations)
  })
})

router.get('/books/:bibleId', function(req, res) {
  var apiResult = api.getBooks(req.params["bibleId"])
  .then((books) => {
    res.send(books)
  })
})

module.exports = router;


