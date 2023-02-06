const express = require("express");
const jwt = require("jsonwebtoken")
const router = express.Router();
const { user } = require("../models");

router.post("/auth", async (req, res) => {
    console.log(req.body);
    const { userEmail, userPassword } = req.body;

    const User = await user.findOne({ where: { userEmail, userPassword } });

    if (!user) {
        res.status(400).send({
            errorMessage: "이메일 또는 패스워드가 잘못됐습니다.",
        });
        return;
    }

    res.send({
        token: jwt.sign({ id: user.userId }, "brave_phoenix")
    });

});

module.exports = router;