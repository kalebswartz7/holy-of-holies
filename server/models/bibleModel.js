const mongoose = require("mongoose"); 

const bibleSchema = mongoose.Schema({
    title: { type: String, required: True},
    books: { type: Object, required: True},
    chapters: { type: Object, required: True}
});

module.exports = bibleSchema;