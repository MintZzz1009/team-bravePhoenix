const express = require("express");
const router = express.Router();

const adminRouter = require("./admin.routes.js");

router.use([adminRouter]);

module.exports = router;
