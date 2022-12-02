const express= require("express");
const app= express();
const port= process.env.PORT ||5000;

// mongodb database connection
require("./database/connectdb");

// add env file
const dotenv= require("dotenv");

// accept json from server
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// required routes
app.use(require("./routes/route"));



app.listen(port, ()=>{
    console.log("started at 5000");
});