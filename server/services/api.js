var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const secrets = require('../secrets');
var fs = require("fs");
const mongoose = require("mongoose");
const apiKey = secrets.apiKey['id'];

var translationSchema = new mongoose.Schema({
    Type: String,
    Name: String,
    id: String
})

var bookSchema = new mongoose.Schema({
    name: String,
    id: String,
    order: Number,
    bibleId: String,
    chapters: [
        {
            id: String,
            bookId: String,
            number: String,
            reference: String
        }
    ]
    
})

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

// Creates a booksList object that contains all books of the bible 
// for a specific translation

// Books object return includes all chapters in each book
const createBooks = async (bibleId) => {
        booksList = []
        iterate = [1]
        // Get books for bible 
        const books = await getBooks(bibleId)
    
        //for (i in books.data) {
        for (i in books.data) {
            bookId = books.data[i].id
            bookName = books.data[i].name 
            bookBibleId = books.data[i].bibleId
    
            // Create bookObj for each book in bible 
            bookObj = {
                        name: bookName,
                        id: bookId,
                        order: i,
                        bibleId: bookBibleId,
                        chapters: []
                    }

            // Get chapters for each bookObj we create  
            const chapters = await getChapters(bibleId, bookId)
            
            for (j in chapters.data) {
                chapterId = chapters.data[j].id
                chapterBookId = chapters.data[j].bookId
                number = chapters.data[j].number
                reference = chapters.data[j].reference
    
                chapterObj = { 
                                id: chapterId,
                                bookId: chapterBookId,
                                number: number,
                                reference: reference
                            }
    
                bookObj.chapters.push(chapterObj)
                console.log('Pushing Chapter ' + chapterId)
                // const text = await getChapter(bibleId, chapterId)
                // console.log(text)
            }
            booksList.push(bookObj)
            //}
        console.log(i)
        }
        return booksList
}

const populateMongo = async (bibleId) => {
    // Get all books for translation!!!
    const books = await createBooks(bibleId)
    connection_string = 
    "mongodb+srv://kalebswartz7:" + 
    secrets.mongoDBPassword +
    "@holy-of-holies-ols82.mongodb.net/holyOfHolies?retryWrites=true&w=majority"

    mongoose.connect(connection_string, 
        {useUnifiedTopology: true, useNewUrlParser: true})
    
    var db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"))
    db.once("open", function() {
        console.log("We are connected")
        // Send all books to mongo 
        for (i = 0; i < books.length; i++) {
            console.log('made it')
            var Book = mongoose.model('Book', bookSchema, 'holyOfHolies')
            var testBook = new Book(books[i])
            testBook.save()
        }
        
        
    })
}

const getTranslations = () => {
    return new Promise((resolve, reject) => {
        connection_string = 
        "mongodb+srv://kalebswartz7:" + 
        secrets.mongoDBPassword +
        "@holy-of-holies-ols82.mongodb.net/holyOfHolies?retryWrites=true&w=majority"

        mongoose.connect(connection_string, 
            {useUnifiedTopology: true, useNewUrlParser: true})

        var db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error:"))
        db.once("open", function() {
            console.log("We are connected");
            var Translation = mongoose.model('Translation', translationSchema, 'holyOfHolies')
            Translation.find({Type: "Translation"}, function (err, translations) {
                if (err) {
                    return console.error(err)
                }
                resolve(translations)
                mongoose.disconnect()
            })


        })
    })

}

const getBooks = (bibleId) => {
    return new Promise((resolve, reject) => {
        connection_string = 
        "mongodb+srv://kalebswartz7:" + 
        secrets.mongoDBPassword +
        "@holy-of-holies-ols82.mongodb.net/holyOfHolies?retryWrites=true&w=majority"

        mongoose.connect(connection_string, 
            {useUnifiedTopology: true, useNewUrlParser: true})

        var db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error:"))
        db.once("open", function() {
            console.log("We are connected");
            var Books = mongoose.model('Books', bookSchema, 'holyOfHolies')
            Books.find({bibleId: bibleId}, function (err, books) {
                if (err) {
                    return console.error(err)
                }
                resolve(books)
                mongoose.disconnect()
            })


        })
    })
}

exports.getChapters = getChapters;
exports.getChapter = getChapter;
exports.populateMongo = populateMongo;
exports.getTranslations = getTranslations; 
exports.getBooks = getBooks; 