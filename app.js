var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db');

const DB_NAME = "Shutafim";
const USERS_COLLECTION = "Users"

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
    
    var userDetails = {
        username : req.body.username,
    };

    //check if exist username or email
    db.isShutafExist(DB_NAME, USERS_COLLECTION, userDetails, function(log, isExist){
        if(isExist){
            console.log(log);
            res.render("ejs/login");
        }else{
            
            console.log(log);

            userDetails.password = req.body.password;
            userDetails.dateCreated = Date.now();
            userDetails.roomID = [];
            userDetails.purchases = [];

            db.insert(DB_NAME, USERS_COLLECTION, userDetails, function(msg){
                console.log("new shutaf created at: " + getTime());
            });
            res.render("ejs/main");
        }
    });    
});

app.post("/login", function(req, res){

    var loginDetails = {
        username : req.body.username,
        password : req.body.password
    }

    db.login(DB_NAME, USERS_COLLECTION, loginDetails, function(isSucceed, msg){
        
        if(isSucceed){            
            res.render("ejs/main");            
        }else{
             res.render("ejs/login"); 
        }

        console.log(msg + " at " + getTime());
    });
});

app.post("/addPurchase", function(req, res){
    
    var purchaseDetails = {
        itemName : req.body.itemName,
        itemCost : req.body.itemCost,
        itemCategory : req.body.itemCategory,
        purchasesDate : req.body.purchasesDate,
    };

    var criteria = {
        //username : req.body.username
        username : '1'
    }

    //check if exist username or email
    db.addPurchase(DB_NAME, USERS_COLLECTION, purchaseDetails, criteria);
    res.render("ejs/main");
});

app.post("/deletePurchase", function(req, res){
    
    var purchaseToDelete = {
        itemName : req.body.itemName,
        itemCost : req.body.itemCost,
        itemCategory : req.body.itemCategory,
        purchasesDate : req.body.purchasesDate,
    };

    var criteria = {
        //username : req.body.username
        username : '1'
    }

    //check if exist username or email
    db.deletePurchase(DB_NAME, USERS_COLLECTION, purchaseToDelete, criteria);
    res.render("ejs/main");
});

app.listen(3001, function(){
    console.log("port 3001 is on motherf***er!");
});

function getTime()
{
    var date = new Date(Date.now());
    var space = " ";
    var colons = ":";
    var second = date.getSeconds();
    second < 10 ? second = "0" + second : second;
    var minute = date.getMinutes();
    minute < 10 ? minute = "0" + minute : minute;
    var hour = date.getHours();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    return getMonthName(month) + space + day + space + year +
        space + hour + colons + minute + colons + second;
}
function getMonthName(month){
    var monthName;
    switch(month)
    {
        case 0:
            monthName = "Jan";
            break;
        case 1:
            monthName = "Feb";
            break;
        case 2:
            monthName = "Mar";
            break;
        case 3:
            monthName = "Apr";
            break;
        case 4:
            monthName = "May";
            break;
        case 5:
            monthName = "Jun";
            break;
        case 6:
            monthName = "Jul";
            break;
        case 7:
            monthName = "Aug";
            break;
        case 8:
            monthName = "Sep";
            break;
        case 9:
            monthName = "Oct";
            break;
        case 10:
            monthName = "Nov";
            break;
        case 11:
            monthName = "Dec";
    }

    return monthName;
}