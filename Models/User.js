const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subreddits: [{
        type: Schema.Types.ObjectId,
        ref: 'Subreddit'
    }]
});

let User = mongoose.model('User', schema);

module.exports = User;