const express = require("express")
const router = express.Router()
const {signup,deleteUser,getAllUsers,updateUser,getUserByName} = require("../controllers/User");

router.post('/signup', signup);
router.delete('/:userId', deleteUser);
router.get('/', getAllUsers);
router.put('/:userId', updateUser);
router.get('/:name', getUserByName);



module.exports = router