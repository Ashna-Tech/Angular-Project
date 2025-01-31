// import * as express from 'express';
// import * as path from 'path'; 

var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname,"../dist/testzone-admin/browser")));

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname,"../dist/testzone-admin/browser/index.html"));
});

var server = app.listen(5000, function () {
   console.log("Express App running at http://127.0.0.1:5000/");
});