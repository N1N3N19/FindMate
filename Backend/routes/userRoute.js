const express = require("express");
const router = express.Router();
const{message, about, user, checkUser,registUser,loginUser,mode,otherUser,swipe, interested, getUserByMode, getMatchedUser} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");



router.route("/interested").post(interested);
router.route("/regis").post(checkUser);
router.route(`/getUser`).get(user);
router.route("/message").get(message);
router.route("/getMatchedUser").get(getMatchedUser);
router.route("/getUserByMode").get(getUserByMode);
// router.route("/other").get(otherUser);
router.route("/swipe").post(swipe);
// router.route("/getUser").get(getUserById);
router.route("/regis/complete/").patch(registUser).post(mode);
router.route("/about").patch(about);
router.route("/login").post(loginUser);
module.exports = router;