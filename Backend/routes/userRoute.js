const express = require("express");
const router = express.Router();
const{checkUser,registUser,loginUser,currentUser} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

router.route("/regis").post(checkUser);
// router.route("/regis/complete").post;
router.get("/current", validateToken,  currentUser);
router.route("/login").post(loginUser);
module.exports = router;