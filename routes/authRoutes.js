const { Router } = require('express');

const router = Router();
const authController = require('../controllers/authController');

router.route('/signin').post(authController.signIn);
router.route('/signup').post(authController.signUp);
router.route('/signout').get(authController.signOut);

module.exports = router;
