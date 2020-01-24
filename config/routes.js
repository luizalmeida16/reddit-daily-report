const express = require("express");
const router = express.Router();
const UserController = require('../Controllers/UserController');
const SubredditController = require('../Controllers/SubredditController');

let userController = new UserController();
let subredditController = new SubredditController();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

//User Routes
router.post('/users', (req, res) => userController.createUser(req, res));
router.get('/users', (req, res) => userController.getUsers(req, res));
router.post('/users/:id/subreddits', (req, res) => userController.addUserSubreddit(req, res));
router.delete('/users/:id/subreddits/:subreddit_id', (req, res) => userController.removeUserSubreddit(req, res));
//router.get('/user/:id', (req, res) => userController.getUser(req, res));

//User Routes
router.post('/subreddit', (req, res) => subredditController.createSubreddit(req, res));
router.get('/subreddits', (req, res) => subredditController.getSubreddits(req, res));


module.exports = router