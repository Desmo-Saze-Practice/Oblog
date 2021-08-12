const express = require('express');

const postsData = require('../data/posts.json');

const users = require('../data/user.json');

const router = express.Router();

const bcrypt = require('bcrypt');

const saltRounds = 10;

router.use((req, res, next) => {
    res.locals.posts = postsData;
    next();
});

router.use((req, res, next) => {
    res.locals.userInfos = {};
    next();
});

router.use((req, res, next) => {
    let lastQuerry = req.query;
    next();
});

const logger = require('./logger');
router.use(logger);

router.route('/login')
    .post((req, res) => {
        let errorStr = '';
        res.locals.userInfos = req.body;
        if (!req.body.username || !req.body.password) {
            errorStr = 'all fields must be completed.'
        }

        const userFound = users.find((user, userIndex) => user.username === res.locals.userInfos.username);

        console.log('user found ', userFound);

        if (userFound) {

            bcrypt.compare(req.body.password, userFound.password, function (err, isPassCorrect) {
                if (isPassCorrect) {
                    res.redirect('/');
                    console.log('good pass');
                    return;
                } else {
                    errorStr = 'Loggins incorrect, please try again.';
                    console.log("fail pass");
                }
            });

            console.log('first if user');
            const isPassCorrect = userFound.password === req.body.password;
            res.render('login', { error: errorStr }, { userInfos: req.body });
            console.log("pass ", isPassCorrect);



        } else {
            errorStr = 'Loggin failed, please try again.';
            console.log('fail user');
        }
        if (!errorStr) {
            res.redirect('/');
            return;
        }
        res.render('login', { error: errorStr });
    })
    .get((req, res) => {
        res.render('login');
    });

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/post/:id', (req, res, next) => {
    let postId = req.params.id;

    const currentPost = postsData.find(post => post.id.toString() === postId.toString());

    if (!currentPost) {
        next();
        return;
    }

    res.locals.foundPost = currentPost;

    res.render('post', currentPost);


});

router.use((req, res) => {
    res.status(404).render('404');
})

module.exports = router;