const express = require("express");
const jwt = require("jsonwebtoken")
const router = express.Router();
const { Op } = require("sequelize");
const { user } = require("../models");



router.post("/sign-up", async (req, res) => {
    const {
        userPassword,
        confirmPassword,
        userEmail,
        userPhoneNumber,
        userNickname,
    } = req.body;

    if (userPassword !== confirmPassword) {
        res.status(400).send({
            errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
        });
        return;
    }

    const existsUsers = await user.findAll({
        where: {
            [Op.or]: [{ userEmail }, { userNickname }],
        },
    });

    if (existsUsers.length) {
        res.status(400).send({
            errorMessage: "이메일 또는 닉네임이 이미 사용중입니다",
        });
        return;
    }

    const existsUsers3 = await user.findAll({
        where: {
            [Op.or]: [{ userNickname }],
        },
    });
    if (existsUsers3.length) {
        res.status(400).send({
            errorMessage: "중복되는 닉네임 입니다",
        });
        return;
    }

    await user.create({
        userPassword,
        confirmPassword,
        userEmail,
        userPhoneNumber,
        userNickname,
    });
    res.status(201).send({ message: "회원가입 성공" });
});

module.exports = router;