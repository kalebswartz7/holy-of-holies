const express = require("express");
const bodyParser = require("body-parser")
const bibleRoutes = require("./routes/bible");
const mongoose = require("mongoose");
const secrets = require("./secrets");
const app = express(); 
const cors = require('cors');

/*
connection_string = 
    "mongodb+srv://kalebswartz7:" + 
    secrets.mongoDBPassword +
    "@holy-of-holies-ols82.mongodb.net/test?retryWrites=true&w=majority";

// Connect to MongoDB, callback function called once connection is made 
mongoose.connect(connection_string, 
                {useUnifiedTopology: true, useNewUrlParser: true});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("We are connected");

    var kittySchema = new mongoose.Schema({
        name: String
    });

    /* Used to construct documents. In this case each document will be a kitten
       with properties and behaviors as described in the above schema 
    

    // We can create functions for our schema 
    // Functions must be added before we compile it with mongoose.model
    kittySchema.methods.speak = function () {
        var greeting = this.name
            ? "Meow name is " + this.name
            : "I don't have a name";
        console.log(greeting);
    }

    var Kitten = mongoose.model('Kitten', kittySchema);

    // Creating an actual kitten document with name Silence  
    var silence = new Kitten({ name: "Silence"});
    console.log(silence.name);

    var fluffy = new Kitten({ name: 'fluffy' });
    fluffy.speak(); // "Meow name is fluffy"

    /* Save our fluffy document to the db 

    fluffy.save(function (err, fluffy) {
        if (err) return console.error(err);
        fluffy.speak();
      });
    
    */
    
    /* //Find all kittens from our db 

    Kitten.find(function (err, kittens) {
        if (err) return console.error(err);
        console.log(kittens);
    })

})
*/


app.use(cors());
app.use("/", bibleRoutes);
module.exports = app;


