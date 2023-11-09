const express = require("express");
const router = express.Router();
const {getallUsers, 
    createUser, 
    getUser, 
    updateUser, 
    deleteUser} = require("../controllers/userControler");

router.route('/read').get(getallUsers);
router.route('/created').post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;