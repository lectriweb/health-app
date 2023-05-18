var express =   require("express"),
    router  =   express.Router();
const User = require("../models/user");
const routes = require("../routes/user");

router.get("/",(req,res, next)=>{
    res.render("index");
    
    next()
});

module.exports = router;