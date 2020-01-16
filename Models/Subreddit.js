const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

let Subreddit = mongoose.model('Subreddit', schema);

module.exports = Subreddit;