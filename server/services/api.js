var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const secrets = require('../secrets');
var fs = require("fs");
var books = require("../books.json");

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
    console.log("Fetching... \nBibleId: " + bibleId)
    console.log('hi')
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'text';

    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === xhr.DONE && xhr.status == 200) {
            response_text = xhr.responseText;
            response = JSON.parse(xhr.responseText);

            fs.writeFile("./books.json", JSON.stringify(response), (err) => {
                if (err) {
                    console.error(err);
                    return;
                };
                console.log("File has been created");
            });

        }
    });

    xhr.open("GET", "https://api.scripture.api.bible/v1/bibles/" + bibleId + "/books");
    xhr.setRequestHeader(`api-key`, apiKey);
    xhr.send();
}

const getBooksAndChapters = (i) => {
    console.log("Fetching entry... " + i)
    bibleId = books['data'][i]['bibleId'];
    bookId = books['data'][i]['id'];
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'text';

    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === xhr.DONE && xhr.status == 200) {
            response_text = xhr.responseText;
            response = JSON.parse(response_text);
            //console.log(books);
            books["data"][i]["Chapters"] = response["data"];
            //console.log(books["data"][i]["Chapters"]);
            //books["data"][i]["Chapters"] = response;
            //console.log(books["data"][i]);

            
            fs.writeFile("./books.json", JSON.stringify(books), (err) => {
                if (err) {
                    console.error(err);
                    return;
                };
                console.log("File has been created");
            });
        }
    });

    xhr.open("GET", "https://api.scripture.api.bible/v1/bibles/" + bibleId + 
            "/books/" + bookId + "/chapters");
    xhr.setRequestHeader(`api-key`, apiKey);
    xhr.send();
}

const getChapter = (bibleId, bookId, chapterId) => {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'text';

    xhr.addEventListener("readystatechange", function () {
        console.log(xhr.readyState);
        console.log(xhr.status);
        if (xhr.readyState === xhr.DONE && xhr.status == 200) {
            console.log('Made it');
            response_text = JSON.parse(xhr.responseText);
            response_text = response_text.data.content
            console.log(response_text);
        }
    });

    xhr.open("GET", "https://api.scripture.api.bible/v1/bibles/" + bibleId + "/chapters/" + chapterId + "?content-type=text");
    xhr.setRequestHeader(`api-key`, apiKey);
    xhr.send();
}

exports.apiTest = apiTest;
exports.getBook = getBook;
exports.getBooks = getBooks;
exports.getBooksAndChapters = getBooksAndChapters;
exports.getChapter = getChapter;



