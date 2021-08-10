const express = require('express');

const postsData = require('../data/posts.json');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.posts = postsData;
    next();
})

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/post/:id', (req, res) => {
    let postId = req.params.id;
    
    const currentPost = postsData.find(post => post.id.toString() === postId.toString());

    if (!currentPost) {
        res.status(404).render('404');
        return;
    }

    res.locals.foundPost = currentPost;

    res.render('post', currentPost);


});

router.use((req, res) => {
    res.status(404).render('404');
})

module.exports = router;