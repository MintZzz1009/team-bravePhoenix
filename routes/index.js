const express = require('express');
const router = express.Router();

const testRouter = require('./test.routes.js');
const cart = require('./carts.js')
router.use([testRouter,cart]);

module.exports = router;
