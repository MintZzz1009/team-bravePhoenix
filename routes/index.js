const express = require('express');
const router = express.Router();
//잘못된 url 들어올 때 예외처리 필요

// router.use(express.json());

//마이페이지 관련
const myPageRouter = require("./myPage.routes");
router.use("/myPage", myPageRouter);

module.exports = router;