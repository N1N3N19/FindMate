const express = require("express");
const router = express.Router();
const{checkUser,registUser,loginUser} = require("../controllers/userController");

router.route("/regis").post(checkUser);
router.post("/login", (req, res) =>{
    res.json({message: "Login the user"});
});
router.post("/current", (req, res) =>{
    res.json({message: "current user information"});
});
module.exports = router;