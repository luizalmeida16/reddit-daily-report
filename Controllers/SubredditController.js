const Subreddit = require('../Models/Subreddit');
const moment = require('moment');

class SubredditController{
    constructor(){}

    async createSubreddit(req, res) {
        const newSubreddit = new Subreddit({
            name: req.body.name
        });
        newSubreddit.users.push(req.body.user_id);
        
        try {
            let subreddit = await newSubreddit.save();
    
            return res.status(200).send(subreddit);
        } catch(err) {
            return res.status(500).send(err)
        }
    }

    async getSubreddits(req, res) {
        try {
            let subreddits = await Subreddit.find().populate("users");

            return res.status(200).send(subreddits);
        } catch(err) {
            return res.status(500).send(err);
        }
    }

}

module.exports = SubredditController;