const express = require("express"),body = require("body-parser"),fs= require("fs");

const app = express();

app.get('/',(req,res,next)=>{
    res.send("hello")
})

app.listen(3000);

