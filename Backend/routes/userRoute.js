const express = require("express");
const router = express.Router();
const{checkUser,registUser,loginUser,currentUser,feedUser} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

router.route("/regis").post(checkUser);
router.route("/regis/complete/:id").patch(registUser);
router.get("/current", validateToken,  currentUser);
router.route("/login").post(loginUser);
router.route("/feed").get(feedUser);
module.exports = router;