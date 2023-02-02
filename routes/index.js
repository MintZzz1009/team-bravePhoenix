const express = require('express');
const router = express.Router();

const testRouter = require('./test.routes.js');
const signinRouter = require('./sign-in.js');
const signupRouter = require('./sign-up.js');

router.use([testRouter]);
router.use(signinRouter);
router.use(signupRouter);

module.exports = router;
