const express = require("express");
const router = express.Router();
const {
    getallUsers, 
    createUser, 
    getUser, 
    updateUser, 
    deleteUser
} = require("../controllers/adminController");
const validateToken = require("../middleware/validateTokenHandler");

// router.use(validateToken);
router.route('/read').get(getallUsers);
router.route('/created').post(createUser);
router.route('/delete/:email').delete(deleteUser);
router.route('/read/single/:email').get(getUser)
router.route('/update/:email').patch(updateUser)


module.exports = router;