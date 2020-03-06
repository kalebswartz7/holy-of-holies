var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const secrets = require('../secrets');
var fs = require("fs");
const mongoose = require("mongoose");
const apiKey = secrets.apiKey['id'];

 /*
  Test/Sandbox API call 
 */ 
const apiTest = () => {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'text';

    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === xhr.DONE && xhr.status == 200) {
            response_text = xhr.responseText;
            response = JSON.parse(xhr.responseText);
            for (var i = 0; i < response.data.length; i++) {
                //console.log(response.data[i].id);
                //console.log(response.data[i].name + '\n');
                if (response.data[i].language.id == 'eng') {
                    console.log(response.data[i].name + '\n' + 
                                "ID: " + response.data[i].id);
                }
            }
        }
    });

    xhr.open("GET", "https://api.scripture.api.bible/v1/bibles");
    xhr.setRequestHeader(`api-key`, apiKey);
    xhr.send();
}
 /*
  Call to get a specific book with a specific bible translation 
 */
const getBook = (bibleId, bookId) => {
    console.log("Fetching... \nBibleId: " + bibleId + " BookId: " + bookId)
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'text';

    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === xhr.DONE && xhr.status == 200) {
            response_text = xhr.responseText;
            response = JSON.parse(xhr.responseText);

            books['data'][0]['Chapters'] = JSON.stringify(response);
            console.log(books['data'][0])
        }
    });

    xhr.open("GET", "https://api.scripture.api.bible/v1/bibles/" + bibleId + 
            "/books/" + bookId + "/chapters");
    xhr.setRequestHeader(`api-key`, apiKey);
    xhr.send();


}
 /*
  Call to create / update the books.json file that holds all the book data 
  including book ids 
 */
const getBooks = (bibleId) => {
    return new Promise((resolve, reject) => {
        console.log("Fetching... BibleId: " + bibleId)
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'text';
        response_text = {}; 
    
        xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState === xhr.DONE && xhr.status == 200) {
                response_text = JSON.parse(xhr.responseText);
                resolve(response_text);
            }
        });
    
        xhr.open("GET", "https://api.scripture.api.bible/v1/bibles/" + bibleId + "/books");
        xhr.setRequestHeader(`api-key`, apiKey);
        xhr.send();
    })
    
    
}

const getChapters = (bibleId, bookId) => {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'text';
    
        xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState === xhr.DONE && xhr.status == 200) {
                response_text = JSON.parse(xhr.responseText);
                resolve(response_text);
            }
        });
    
        xhr.open("GET", "https://api.scripture.api.bible/v1/bibles/" + bibleId + 
                "/books/" + bookId + "/chapters");
        xhr.setRequestHeader(`api-key`, apiKey);
        xhr.send();
    })
    
}

const getChapter = (bibleId, chapterId) => {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'text';
    
        xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState === xhr.DONE && xhr.status == 200) {
                response_text = JSON.parse(xhr.responseText);
                response_text = response_text.data.content
                resolve(response_text)
            }
        });
    
        xhr.open("GET", "https://api.scripture.api.bible/v1/bibles/" + bibleId + "/chapters/" + chapterId + "?content-type=text");
        xhr.setRequestHeader(`api-key`, apiKey);
        xhr.send();
    })
}

const populateMongo = async (bibleId) => {
    // Create JSON objects that we will make up our schema 
    booksObj = { id: String,
                content: [
                  {chapterId: String,
                  text: String}
                ]
              }

    // Get books for bible 
    const books = await getBooks(bibleId)
    for (i in books.data) {
        bookId = books.data[i].id 
        content = []
        // Get chapters for each book 
        const chapters = await getChapters(bibleId, bookId);
        for (j in chapters.data) {
            chapterId = chapters.data[j].id
            const text = await getChapter(bibleId, chapterId)
            console.log(text)
        }
    }

    // Connect to MongoDB, Send JSON object to database 
    var bibleSchema = new mongoose.Schema({
        bibleId: String,
        books: [{chapterId: String,
                     text: String}],
    });
}

exports.apiTest = apiTest;
exports.getBook = getBook;
exports.getBooks = getBooks;
exports.getChapters = getChapters;
exports.getChapter = getChapter;
exports.populateMongo = populateMongo;



