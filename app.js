var express = require("express");
var path = require("path");
var fs = require("fs");
var unzip = require("unzip2"); //module for extracting files
var app = express();

var multer = require("multer");
var upload = multer({dest: "./uploads/extracted"}).single('singleFileUpload');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/indexzip.html");
});

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
          if(err) {
            return res.end("Error uploading file.");
        }
    var zip = new admZip(req.file);
    zip.extractAllTo("/uploads/extracted", true);
    res.send("unzip");
     });

});

app.listen(3000,function(){
    console.log("Working on port 3000");
});