var express = require("express");
const mongoose = require("mongoose");
var path = require("path");
var logger = require("./middleware/logger");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();  
var expressValidator = require("express-validator");
// var session = require("express-session");
// var passport = require("passport"); 
// var localStrategy = require("passport-local").Strategy;
// var flash = require("flash");

// import db from "./routes/db/db";
var port        = process.env.Port || 5000 ;
var app         = express();
//new
// const db = require("./models");
// const Role = db.role;


//import routers
var routes = require("./routes/index");
const User = require("./models/user");
const application = require("./models/application");

//db
mongoose.connect(process.env.DATABASE,{
     useCreateIndex: true, 
     useNewUrlParser: true, 
     useUnifiedTopology: true,
}).then(()=>{ 
    console.log("connected db");
}).catch(()=>{ 
    console.log("not connected db");
}) 
 
//middleware
app.set("view engine", "ejs");
app.set('views', __dirname + '/view');


// use middleware funtions
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({extended: true }));
app.use(express.static(path.join(__dirname ,"/public")));
app.use(express.static(path.join(__dirname ,"/img")));
app.use(express.static(path.join(__dirname ,"/css")));
app.use(express.static(path.join(__dirname ,"/image")));

//use router middleware
app.use("/", routes);

// app.use("/user", users);
app.use("/api", userRoutes);


/*
//testing static route
var jake = path.join(__dirname , "/public","/css");
console.log(jake)
*/

//listen to server on port
app.listen(port,function(err){
    // console.log(port);
    if(!err){
        
        console.log("Running on port ", port);
    } else{
        console.log(err)
    }
});