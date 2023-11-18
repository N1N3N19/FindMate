const express = require("express");
const router = express.Router();
const{about, user, checkUser,registUser,loginUser,currentUser,mode,otherUser,swipe, interested} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

router.route("/interested").post(interested);
router.route("/regis").post(checkUser);
router.route("/other").get(otherUser);
router.route("/swipe").post(swipe);
router.route("/getUser").get(user);
router.route("/regis/complete/").patch(registUser).post(mode);
router.route("/about").patch(about);
router.get("/current", validateToken,  currentUser);
router.route("/login").post(loginUser);
module.exports = router;