const express = require('express');

const posts = require('../data/posts.json');

const router = express.Router();

router.use('',(req, res, next) => {
    res.locals.posts = posts;
    next();
})

router.get('/', (req, res) => {
    res.render('./index.ejs');
});

module.exports = router;