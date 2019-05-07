var express = require('express');
var router = express.Router();
const usersController = require('../controllers/userController');
const auth = require('../auth/auth');

//post api/user/signup
router.post('/signup', usersController.signupUser);
//post api/user/login
router.post('/login', usersController.loginUser);
//post api/user/logout
router.post('/logout', usersController.logoutUser);
//post api/user/refreshLoginContext
// router.post('/refreshLoginContext', usersController.refreshLoginContext);

router.get('/games', auth.authenticated, usersController.getMygames); // /user/games


module.exports = router;