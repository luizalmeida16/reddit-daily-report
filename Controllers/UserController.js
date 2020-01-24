const User = require('../Models/User');
const Subreddit = require('../Models/Subreddit');
const moment = require('moment');
const redditApi = require('../Services/RedditApi');

class UserController{
    constructor(){}

    async createUser(req, res) {
        const newUser = new User({
            name: req.body.name, 
            email: req.body.email
        });
        
        try {
            let user = await newUser.save();
    
            return res.status(200).send(user);
        } catch(err) {
            return res.status(500).send(err)
        }
    }

    async getUsers(req, res) {
        try {
            let users = await User.find();

            return res.status(200).send(users);
        } catch(err) {
            return res.status(500).send(err);
        }
    }

    async getUser(req, res) {
        try {
            let users = await User.find();

            return res.status(200).send(users);
        } catch(err) {
            return res.status(500).send(err);
        }
    }

    async addUserSubreddit(req, res) {
        try {
            let user = await User.findById(req.params.id);
            if(!user) return res.status(400).send("User not found");
            
            let subreddit = await Subreddit.findOne({name: req.body.name});
            if(!subreddit) {
                subreddit = new Subreddit({ name: req.body.name });
                await subreddit.save();
            }
            if(user.subreddits.indexOf(subreddit._id) === -1) user.subreddits.push(subreddit);
            await user.save();

            return res.status(200).send(user);
        } catch(err) {
            return res.status(500).send(err);
        }
    }

    async removeUserSubreddit(req, res) {
        try {
            let user = await User.findById(req.params.id);
            if(!user) return res.status(400).send("User not found");
            
            user.subreddits.remove(req.params.subreddit_id);
            await user.save();

            return res.status(200).send(user);
        } catch(err) {
            return res.status(500).send(err);
        }
    }

}

module.exports = UserController;