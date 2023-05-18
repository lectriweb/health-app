var express =   require("express");
const router  =   express.Router()
const { logup, login, signup ,signin, signout, application, postapp} = require("../controllers/user")
const { index } = require("../controllers/index")
const {check} = require("express-validator");

//application request page
router.get("/ems", application)

router.post("/ems",postapp)
//login page 
router.get("/signin",login);
 
router.get("/signup",logup);
router.get("/", index);
router.post("/signup",[
    check("name", "Name should be at least 4").isLength({min: 3}),
    check("email", "email should be valid").isEmail(),
    check("password", "password at least 6 characters").isLength({min: 3}),
] ,signup);


router.post("/signin",[
    check("email", "email should be valid").isEmail(),
    check("password", "password at least 6 characters").isLength({min: 3}),
] ,signin);

router.get("/signout",signout)
module.exports = router;