const express = require("express");
const router = express.Router();
const{terminate, message, about, user, checkUser,registUser,loginUser,mode,swipe, interested, getUserByMode, getMatchedUser, getMessage} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");



router.route("/interested").post(interested);
router.route("/regis").post(checkUser);
router.route(`/getUser`).get(user);
router.route("/message").post(message);
router.route("/getMessage").get(getMessage);
router.route("/getMatchedUser").get(getMatchedUser);
router.route("/getUserByMode").get(getUserByMode);
router.route("/terminateMate").post(terminate);
// router.route("/other").get(otherUser);
router.route("/swipe").post(swipe);
// router.route("/getUser").get(getUserById);
router.route("/regis/complete/").patch(registUser).post(mode);
router.route("/about").patch(about);
router.route("/login").post(loginUser);
module.exports = router;