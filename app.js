const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const router = require("./routes");
const { user: User } = require("./models/index");

const app = express();
app.set('port', process.env.PORT || 3004);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/views')); //정적파일, 이미지파일

// app.set('views', __dirname + '/views/myPage');
// app.use("/static", express.static(__dirname + '/views/myPage'))

app.set("view engine", "ejs"); //nunjucks를 사용하기 위한 express 세팅
app.set("views", "./views"); //첫번째 인자값 폴더명, 두번째 인자값 변수명 = views라는 폴더에서 ejs 관리한다는 의미
app.engine("html", require("ejs").renderFile);
app.use(express.json());

// app.use(express.urlencoded({ extended: false }));
app.use(express.static('./assets'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", router);

app.use("/api", express.urlencoded({ extended: false }), router);

app.listen(app.get("port"), () => {
  // await sequelize.authenticate();
  console.log(app.get("port"), "번 포트에서 대기 중");
});
