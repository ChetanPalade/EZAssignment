const express = require('express');
const { signUp, login, verifyEmail } = require('../controllers/authController'); 
const router = express.Router();

// Authentication Routes
router.post('/signup', signUp); // Signup route
router.post('/login', login);   // Login route
router.get('/verify-email/:verificationCode', verifyEmail); // Email verification route

module.exports = router;



// const express = require('express');
// const { signUp, login, verifyEmail } = require('../controllers/authController');
// const router = express.Router();

// router.post('/signup', signUp);
// router.post('/login', login);
// router.get('/verify-email/:verification_code', verifyEmail);

// module.exports = router;
