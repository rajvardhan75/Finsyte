const express = require('express');
const router = express.Router();
const { createLinkToken } = require('../controllers/plaidController');

router.get('/create-link-token', createLinkToken);

module.exports = router;
