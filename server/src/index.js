// add env file
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cookieParser= require("cookie-parser");

app.use(cookieParser());


dotenv.config({ path: "./.env" })

// mongodb database connection
require("./database/connectdb");


// accept json from server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// required routes
app.use(require("./routes/route"));

// for uploading on heroku
if(process.env.NODE_ENV =="production"){
    app.use(express.static("../client/build"));
}

app.listen(port, () => {
    console.log("started at 5000");
});