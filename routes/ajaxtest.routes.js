const express = require("express");
const router = express.Router();

router.get("/ajaxTest", async (req, res, next) => {
  res.render("ajaxtest");
});

router.get("/ajaxTest/test", async (req, res, next) => {
  console.log("확인");
  res.json({ message: "success" });
});

module.exports = router;
