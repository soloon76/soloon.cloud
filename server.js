const express = require('express');
const app = express();
const port = 8080;

app.listen(port, function(){
    console.log(`listening on ${port} port`);
});

app.get('/', function(req, res){
    res.sendFile (__dirname + '/index.html');
});

app.get('/about', function(req, res){
    res.sendFile ( __dirname + '/updates.html'); 
});

app.get('/askme', function(req, res){
    res.sendFile(__dirname + '/askme.html');
});
