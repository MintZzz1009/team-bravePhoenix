const express = require('express');
// const bodyParser = require('body-parser');
// const { user: User } = require("./models/index");

const router = require('./routes');
const userMiddleware = require('./middlewares/user-middleware');

const app = express();
app.set('port', process.env.PORT || 3004);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/views')); //정적파일, 이미지파일

// app.set('views', __dirname + '/views/myPage');
// app.use("/static", express.static(__dirname + '/views/myPage'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./assets'));

app.use("/api", express.urlencoded({ extended: false }), router);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
