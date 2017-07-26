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

app.post("/api/photo",upload,function(req,res){
    console.log(req.file);      
    fs.createReadStream(req.file.path).pipe(unzip.Extract({path: "/uploads/extracted/my_file.zip"}));
    result = {
        file:req.file,
        message:"File has been extracted"
    };
    fs.unlink(req.file.path, function (e) {
        if (e) throw e;
        console.log('successfully deleted '+req.file.path);
    });
    res.end(JSON.stringify(result));
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});