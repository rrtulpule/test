//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var pool = require('./pool');
var mongoose = require(‘mongoose’);
app.set('view engine', 'ejs');

var mysql =require("mysql");

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));


app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  var Users = [{
      username : "admin",
      password : "admin"
  }]
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/test";
  mongoose.connect(url , (err) => { 
    console.log("ongodb connected",err);
 })

 var Message = mongoose.model("Message",{ name : String, message : String})
//Route to handle Post Request Call
app.post('/login',function(req,res){
    
    
    console.log("Inside Login Post Request");
    console.log("Req Body : ",req.body);
    var sql ="SELECT * FROM login_details WHERE username ="+mysql.escape(req.body.username)+"AND password ="+mysql.escape(req.body.password)
    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
        con.query(sql,function(err,result){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Invalid Credentials");
        }else if(result.length ===1 && result[0].username === req.body.username && result[0].password ===req.body.password)
            {
                console.log(result.length);
            res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = result;
            
             res.writeHead(200,{
                 'Content-Type' : 'text/plain'
             })
             res.end("Successful Login");
        }
        else{
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
           // alert("wrong username or password");
            res.end("Invalid Credentials");
        }

    });
}


    
});
});


app.post('/create',function(req,res){

    console.log("in post create");  
    console.log("Req Body : ", req.body.BookID + "title : ",req.body.Title  +"Author :" ,req.body.Author);
    console.log("Req Body : ",req.body);    
    // var newBook = {BookID : req.body.BookID, Title : req.body.Title, Author : req.body.Author};
    // books.push(newBook);
    // console.log("Books : ",JSON.stringify(books));
    var sql ="INSERT INTO student_details_react VALUES ("+mysql.escape(req.body.BookID) +","+mysql.escape(req.body.Title) +","+mysql.escape(req.body.Author) + ")";
    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
    con.query(sql,function(err,result){

        if(err)
        {
            res.writeHead(400, {'content-type': 'text/html'});
            res.redirect('home');

        }
        else{
            console.log("in else");
            res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Successful Login");         }
    })
}
    });
   
});

app.post('/delete',function(req,res){
    
    console.log("in post create");
    console.log("Req Body : ",req.body);

    var sql= "DELETE from student_details_react WHERE StudentID ="+mysql.escape(req.body.StudentID);
    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
    con.query(sql,function(err,result){

        if(err)
        {
            res.writeHead(400, {'content-type': 'text/html'});
           

        }
        else{
            console.log("in else");
            res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Successful delete");         }
    })
    
}
    });
    
});

//Route to get All Books when user visits the Home Page
// app.get('/home', function(req,res){
//     console.log("Inside Home Login");    
  
//     pool.getConnection(function(err,con){
//         if(err){
//             res.writeHead(400,{
//                 'Content-Type' : 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         }else{
//     var query = con.query('SELECT * FROM student_details_react',function(err,rows){
//         if(err)
//           {console.log("Error Selecting : %s ",err );}

//        res.send(rows)
//        // res.render('home.ejs',{studentlist: "Test Table",studentlist:rows});
//       });
//     }
// });
    
// })

app.get('/home', function(req,res){

    MongoClient.connect(url, function(err, db) {
   
        if (err) throw err;
                
      });  
   
})  
app.post('/home', function(req,res){

    MongoClient.connect(url, function(err, db) {
   
        if (err) throw err;
                
      });  
   
})  
//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");