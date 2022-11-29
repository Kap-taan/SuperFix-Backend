const express = require('express');
const router = express.Router();

// controller functions
const { loginClient, signupClient, getInfoClient } = require('../controllers/clientController')

// Client Login
router.post('/client/login', loginClient)

// Client Signup
router.post('/client/signup', signupClient)

// Client Getinfo
router.post('/client/getinfo', getInfoClient);

module.exports = router;