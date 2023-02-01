const express = require('express');
const router = express.Router();

router.get('/test', async (req, res, next) => {
    res.send('test 페이지 입니다');
});

module.exports = router;
