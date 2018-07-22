var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db');

//=====================================
// ROUTS
//=====================================

app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", function(req, res){
    res.render("ejs/login");
});

app.post("/createShutaf", function(req, res){
    
    var loginDetails = {
        username : req.body.username,
        password : req.body.password,
        email : req.body.email
    }
    db.insert("Shutafim", "Users", loginDetails, function(){
    });
    res.render("ejs/main");
});

app.post("/login", function(req, res){

    var loginDetails = {
        username : req.body.username,
        password : req.body.password
    }
    db.login("Shutafim", "Users", loginDetails, function(isRegi, userName){
    isRegistered = true;
    console.log(loginDetails.username + " is connceted!");
    });
    res.render("ejs/login");
});

app.listen(3001, function(){
    console.log("port 3001 is on motherf***er!");
});