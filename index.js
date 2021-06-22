const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes/api");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());



const Schema = mongoose.Schema;

 

const port = process.env.PORT || 5000;

mongoose.connect(process.env.DB, { useNewUrlParser: true })
    .then(() => console.log(`Database connected successfully`))
    .catch(err => console.log(err))




app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");   
     next();
    });

app.use(bodyParser.json());
app.use("/api",routes);

app.use((err,req,res,next)=>{
    console.log(err);
    next();
})

app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })