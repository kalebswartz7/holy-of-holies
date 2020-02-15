var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const secrets = require('../secrets');

const apiKey = secrets.apiKey['id'];

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

const getBook = (bibleId, bookId) => {
    console.log("Fetching... \nBibleId: " + bibleId + " BookId: " + bookId)
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'text';

    xhr.open("GET", "https://api.scripture.api.bible/v1/bibles/" + bibleId + "/books/" + bookId);
    xhr.setRequestHeader(`api-key`, apiKey);
    xhr.send();


}

exports.apiTest = apiTest;
exports.getBook = getBook;


