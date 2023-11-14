const express = require("express");
const router = express.Router();
const {
    getallUsers, 
    createUser,
    createAdmin,
    loginAdmin, 
    getUser, 
    updateUser, 
    deleteUser
} = require("../controllers/adminController");
const validateToken = require("../middleware/validateTokenHandler");

// router.use(validateToken);
router.route('/login').post(loginAdmin);
router.route('/read').get(getallUsers);
router.route('/create').post(createUser);
router.route('/createAdmin').post(createAdmin);
router.route('/delete/:email').delete(deleteUser);
router.route('/read/single/:email').get(getUser)
router.route('/update/:email').patch(updateUser)


module.exports = router;