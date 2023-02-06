const express = require("express");
const router = express.Router();

const testRouter = require("./test.routes.js");
const adminRouter = require("./admin.routes.js");
const ajaxRouter = require("./ajaxtest.routes.js");

router.use([testRouter, adminRouter, ajaxRouter]);

module.exports = router;
