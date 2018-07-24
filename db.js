var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/';

// get all documents in the collection "collectionName" of db "dbName"
// module.exports.findAll = function(dbName,collectionName, isRegistered,callback) {
//     if(isRegistered)
//     {
//         MongoClient.connect(url, function(err, db) {
//         Logger.info("Connected correctly to server");
//         db.s.databaseName = dbName;
//         var cursor = db.collection(collectionName).find();
//         arr = new Array();
//         cursor.each(function(err, doc) {
//             if (doc != null) {
//                 arr.push(doc);
//             } else {
//                 callback(arr);
//             }
//         });
//         db.close();
//     });
//     }else callback("You are not logged in yet!");
// };

// //get all documents that match a set of selection criteria
// module.exports.findBy = function(dbName,collectionName,criteria,isRegistered,callback) {
//     if(isRegistered){ MongoClient.connect(url, function(err, db) {
//     Logger.info("Connected correctly to server");
//     db.s.databaseName = dbName;
//     var cursor = db.collection(collectionName).find(JSON.parse(criteria).criteria);
//     arr = new Array();
//     cursor.each(function(err, doc) {
//         if (doc != null) {
//             arr.push(doc);
//         } else {
//             callback(arr);
//         }
//     });
//     db.close();
// });
//     }else callback("You are not logged in yet!");
// };

// //update document in the collection "collectionName" of db "dbName" by criteria
// module.exports.update = function(dbName,collectionName,criteria,setValues,isRegistered,callback) {
//     if(isRegistered){ MongoClient.connect(url, function(err, db) {    
//     Logger.info("Connected correctly to server");
//     db.s.databaseName = dbName;
//     db.collection(collectionName).updateMany(criteria,
//          {
//              $set:  setValues
//          } , function(err, r) {
//          if(assert.equal(null, err))
//          {
//              callback("Something went wrong!");
//          }
//          else
//          {
//              callback();
//          }
//      });
//     db.close();
// });
//     }else callback("You are not logged in yet!");
// };

// //delete document/s from the collection "collectionName" of db "dbName" by criteria
// module.exports.remove = function(dbName,collectionName,criteria,isRegistered,callback) {
//     if(isRegistered){ MongoClient.connect(url, function(err, db) {
//     Logger.info("Connected correctly to server");
//     db.s.databaseName = dbName;
//     db.collection(collectionName).remove(criteria, function(err, r) {
//         if(assert.equal(null, err))
//         {
//             callback("Something in deleting went wrong!");
//         }
//         else
//         {
//             callback("remove successed!");
//         }
//     });
//     db.close();
// });
//     }else callback("You are not logged in yet!");
// };

//insert document to the collection "collectionName" of db "dbName"
module.exports.insert = function(dbName, collectionName, loginDetails, callback){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        var dbo = db.db(dbName);
        dbo.collection(collectionName).insertOne(loginDetails, function(err, r) {
            if (err){ 
                throw err;
            }
            callback("NEW Shutaf Created!");
            db.close();
        });
    });
};

module.exports.login = function(dbName,collectionName ,loginDetails, callback){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    assert.equal(null, err);
    var dbo = db.db(dbName); 
    cursor = dbo.collection(collectionName).find(loginDetails);
    arr = new Array();
    var isConnected = false;
    cursor.each(function(err, doc) {
        if (doc != null && !isConnected) {
            isConnected=true;
            callback(true, loginDetails.username + " connected");
        } else if(!isConnected) {
            callback(false, loginDetails.username + " fail to connect");
        }
    });
    db.close();
});
};

module.exports.isShutafExist = function(dbName, collectionName, loginDetails, callback){
   
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        assert.equal(null, err);
        
        var dbo = db.db(dbName);
        var isExist = false;

        cursor = dbo.collection(collectionName).find(loginDetails);
        cursor.each(function(err, doc) {
            if (doc != null && !isExist) {
                isExist = true;
                callback("Username already taken", isExist); 
            }
            else if(!isExist){
                callback("Valid Username", isExist); 
            }
        });
        db.close();
    });
};
