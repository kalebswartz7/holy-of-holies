const express = require("express");
const bibleRoutes = require("./routes/bible");
const app = express(); 

const port = 3000


app.use("/", bibleRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))



