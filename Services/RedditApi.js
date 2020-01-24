const request = require('request');

const getSubreddits = async (subredditCategory, limit) => {
    return new Promise((resolve, reject) => {
        request.get({
            url: `https://www.reddit.com/r/${subredditCategory}/top.json?limit=${limit}`
        }, function(err, response, body) {
            if(err) return reject(err);

            return resolve(JSON.parse(body));
        });
    });
}

module.exports = getSubreddits;
