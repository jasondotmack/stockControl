var express = require("express");
var app = express();
var path = require("path");
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./stock.db');

var bodyParser = require("body-parser");
app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({
    extended: true
})); 


app.get("/" , function(req , res){
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/stockSummary" , function(req , res){
    db.all("select item, sum(quantity) as total from stock group by item" , function(err , row){
        res.send(row);

    });
});

app.post("/stockItem" , function(req , res){
db.run("insert into stock values (?,?,?,?)" , [null , String(req.body.barcode) , String(req.body.item) , req.body.quantity] , function(err){
    if(err){
        console.log("Received the following error: " + err.message);
        res.send("Received the following error: " + err.message);
    }

    else{

        res.send("Update done !");
    }
});

});










app.listen(5000);

