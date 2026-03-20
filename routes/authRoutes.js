const express = require('express')
const { registerContoller, loginController, logoutCcntroller } = require('../controllers/authController')

//router object
const router = express.Router()

//routes
// register
router.post('/register', registerContoller);

// login
router.post('/login', loginController);

// logout

router.post('/logout', logoutCcntroller);

module.exports = router