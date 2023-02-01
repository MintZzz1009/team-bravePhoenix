const express = require('express');
const router = express.Router();

const testRouter = require('./test.routes.js');

router.use([testRouter]);

module.exports = router;
