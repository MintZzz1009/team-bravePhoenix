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

// const session = {};

// router.get("/admin", async (req, res, next) => {
//   if (req.headers.cookie) {
//     const [, privateKey] = req.headers.cookie.split("=");
//     const adminInfo = session[privateKey];
//     res.render("login", {
//       isLogin: true,
//       adminInfo,
//     });
//   } else {
//     res.render("login", { isLogin: false });
//   }
// });

// router.post("/admin/login", async (req, res, next) => {
//   const { adminId, adminPw } = req.body;

//   const [admin] = admin.filter((v) => v.id === adminId && v.pw === adminPw);
//   if (admin) {
//     const privateKey = Math.floor(Math.random() * 10000000);
//     session[privateKey] = admin;
//     console.log(session);
//     res.setHeader("Set-Cookie", `connect.id=${privateKey}; path=/`);
//     res.send("관리자님 로그인 되셨습니다");
//     res.render("index");
//   } else {
//     res.redirect("/admin/login?msg=다시 로그인 부탁드립니다");
//   }
// });

// router.get("/admin/logout", (req, res) => {
//   if (req.headers.cookie) {
//     if (req.headers.cookie) {
//       const [, privateKey] = req.headers.cookie.split("=");
//       delete session[privateKey];
//       res.setHeader("Set-Cookie", "connect.id=delete; Max-age=0; path=/");
//       res.render("index");
//     } else {
//       res.redirect("/admin/login?msg=로그인 부탁드립니다");
//     }
//   }
// });

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
    res.render("adminMember.ejs", { members: memberList });
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
//ptarselnt() 함수를 통해 숫자 변환 진행
//router.put("/admin/home/member/:id", async (req, res, next) => {
//  res.render("adminMemberIn.ejs", {});
//});
router.patch("/admin/home/member/edit/:id", async (req, res, next) => {
  const { adminValid, userNickname, userPassword, userPhoneNumber, userEmail } =
    req.body;
  const { id } = req.params;

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
