const express = require('express');
// const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();
app.set('port', process.env.PORT || 3004);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./assets'));

app.use("/api", express.urlencoded({ extended: false }), router);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
