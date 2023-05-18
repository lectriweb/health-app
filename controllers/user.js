const User = require("../models/user");
const application = require("../models/application");
const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const routes = require("../routes/user");

exports.login = (req,res)=>{
    res.render('signin')
}
exports.logup = (req,res)=>{
    res.render('signup');
} 
exports.application = (req,res)=>{
    res.render('ems');
}
exports.index = (req,res)=>{
    res.render('index');
}

exports.postapp =(req,res)=>{
 var requeste = req.body;
 console.log("requeste")
 user.requeste.save((err,requeste)=>{
    if(err){
        return res.status(400).json({
            error:"unable to add"
        })
    }
 return console.log( res.json({
     message: "success",
     requeste}))
 
 })
    
}
exports.signup =(req,res)=>{
    
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }

    const user = new User(req.body);
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                error:"unable to add user"
            })
        }
        return res.redirect("/signin")
        /*res.json({
            message: "success",
            user})*/
        
        })
    
}
exports.signin  =(req,res)=>{
    const { email,password } =req.body
    User.findOne({email},(err,user)=>{
        if( err || !user ){
            return res.status(400).json({
                error: "email was not found"
            })

        }
        //auth password
        if (!user.authenticate(password)){
            return res.status(400).json({
                error: "email and password not match"
            })
        }

        //create TOKEN and perform store
        const token = jwt.sign({_id: user._id},process.env.SECRET)
        //PUT TOKEN
        res.cookie("token",token,{expire: new Date() +1});

        //send response to view
        const {_id,name,email}= user
        return res.redirect("/")/*console.log (res.json({
            token,
            user: {
                _id,
                name,
                email
            }
        }))*/
        
    })
}
exports.signout  =(req,res)=>{
    res.clearCookie("token")
    return res.redirect("/api/signin")
    //json({message:"user signout is sucessful"})
}
