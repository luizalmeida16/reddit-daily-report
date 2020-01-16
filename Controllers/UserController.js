const User = require('../Models/User');
const moment = require('moment');

class UserController{
    constructor(){}

    async createUser(req, res) {
        const newUser = new User({
            name: req.body.name, 
            email: requireq.body.email
        });
        
        try {
            let User = await newUser.save();
    
            return res.status(200).send(User);
        } catch(err) {
            return res.status(500).send(err)
        }
    }

}

module.exports = UserController;