const express = require('express');
const router = require('./routes');
const app = express();
app.set('port', process.env.PORT || 3004);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);  

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
