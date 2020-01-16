const express = require("express");
const router = express.Router();
const UserController = require('../Controllers/UserController');

let userController = new UserController();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

//User Routes
router.post('/user', (req, res) => userController.createUser(req, res));
//router.get('/user/:id', (req, res) => userController.getUser(req, res));


module.exports = router