const express = require("express");
const router = express.Router();
//잘못된 url 들어올 때 예외처리 필요

const testRouter = require("./test.routes.js");
const adminRouter = require("./admin.js");
const ajaxRouter = require("./ajaxtest.routes.js");
const signinRouter = require("./sign-in.js");
const signupRouter = require("./sign-up.js");


//마이페이지 관련
const myPageRouter = require("./myPage.routes");
router.use("/myPage", myPageRouter);
router.use(signinRouter);
router.use(signupRouter, adminRouter, ajaxRouter);
//상품 관련
const itemRouter = require("./item.routes")
router.use("/items",itemRouter);


module.exports = router;
