const express = require("express");
const router = express.Router();
const { user, order, sequelize } = require("../models");
const { Op } = require("sequelize");
const moment = require("moment/moment");

// 관리자 로그인 페이지
router.get("/admin/login", async (req, res, next) => {
  res.render("adminLogin.ejs", {});
});

// import crypto from "crypto";

// 관리자 로그인 진행

//기본 홈페이지
router.get("/admin/home", async (req, res, next) => {
  res.render("adminIndex.ejs", {});
});

//회원관리 전체조회
//가독성을 위해 수정 : (계정생성& 계정업데이트) 시간 정렬, 회원계정 구분, 최근 생성일 정렬
router.get("/admin/home/member", async (req, res) => {
  try {
    const members = await user.findAll({
      where: { adminValid: { [Op.ne]: 2 } },
    });
    //회원계정 구분
    members.forEach((g) => {
      if (g.adminValid === 0) {
        g.adminValid = "고객";
      } else {
        g.adminValid = "사장";
      }
    });
    //최근 생성일 정렬
    members.sort((a, b) => {
      const prevTimestamp = new Date(a.userCreatedAt).getTime();
      const curTimestamp = new Date(b.userCreatedAt).getTime();
      return curTimestamp - prevTimestamp;
    });
    //(계정생성& 계정업데이트) 시간 정렬
    const memberList = members.map((mem) => {
      return {
        ...mem.dataValues,
        userCreatedAt: moment(mem.userCreatedAt).format("YYYY-MM-DD HH:mm:ss"),
        userUpdatedAt: moment(mem.userUpdatedAt).format("YYYY-MM-DD HH:mm:ss"),
      };
    });

    //pagination 제작
    const page = req.query.page;
    console.log(page);
    const totalData = members.length;
    const startIndex = (page - 1) * 3;
    // const indexPage = totalData.splice(startIndex, 10);

    // 총 페이지수
    const totlaPage = Math.ceil(totalData / 3);
    // 화면에 보여질 페이지 그룹
    const pageGroup = Math.ceil(page / 3);
    // 화면에 보여질 마지막 페이지
    const lastPage = pageGroup * 3;
    // 화면에 보여질 첫번째 페이지
    const firstPage = lastPage - (3 - 1);
    console.log(page);
    res.render(
      "adminMember.ejs",
      { members: memberList }
      // { pageInfo: { firstPage, lastPage, totlaPage } }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//개인 회원관리 조회
router.get("/admin/home/member/:id", async (req, res, next) => {
  const { id } = req.params;

  const member = await user.findByPk(id, { raw: true });
  member.adminValid = member.adminValid === 0 ? "고객" : "사장";
  member.userCreatedAt = moment(member.userCreatedAt).format(
    "YYYY-MM-DD HH:mm:ss"
  );
  res.render("adminMemberIn.ejs", { member: member });
});

//회원관리 수정
//이동 할때 기준 값
//router.put("/admin/home/member/:id", async (req, res, next) => {
//  res.render("adminMemberIn.ejs", {});
//});
router.patch(`/admin/home/member/edit/:id`, async (req, res, next) => {
  const { id } = req.params;
  const { adminValid, userNickname, userPassword, userPhoneNumber, userEmail } =
    req.body;

  console.log(id);
  console.log(userNickname);
  console.log(userEmail);

  await user.update(
    {
      adminValid: adminValid,
      userNickname: userNickname,
      userPassword: userPassword,
      userPhoneNumber: userPhoneNumber,
      userEmail: userEmail,
    },
    {
      where: {
        userId: id,
      },
    }
  );
  return res.status(200).send({
    message: "수정 성공",
  });
});

//회원관리 삭제
router.delete("/admin/home/member/:id", async (req, res, next) => {
  //  console.log("hello");
  //  console.log(`req.body.id = ${req.body.id}`);
  //  console.log(`req.params = ${req.params.id}`);
  const id = req.body.id;
  const member = await user.destroy({
    raw: true,
    where: { userId: id },
  });
  res.json({ message: "delete success" });
});

//상품관리
router.get("/admin/home/product", async (req, res, next) => {
  res.render("adminProduct.ejs", {});
});

module.exports = router;
