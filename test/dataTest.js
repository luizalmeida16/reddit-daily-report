const assert = require('assert');
const Db = require('../config/Db');
const mongoose = require('mongoose');
const User = require('../Models/User');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const routes = require('../config/routes');
const request = require('request');

describe('db-test', () => {
    const newUser = new User({
        name: "test",
        email: "test@test.com"
    });
    describe('db-test', () => {
        after(() => {
            User.deleteMany({}, () => {
            })
        });
        it('db-connection', function(done) {
            let db = new Db('mongo', '27017', 'test');
            db.connect().then(() => {
                assert.ok(true);
                done();
            }).catch((err) => {
                assert.ok(false, err);
            });
        });
        it('bd-test-insert', function(done) {
            newUser.save().then(function(user) {
                assert.equal(user.name, "test");
                assert.equal(user.email, "test@test.com");
                done();
            }).catch((err) => {
                console.log(err);
                assert.ok(false, err);
                done();
            })
        });
        it('db-test-get', function(done) {
            User.findOne({name: newUser.name}).then(function(user) {
                assert.equal(user.name, newUser.name);
                done();
            }).catch((err) => {
                console.log(err);
                assert.ok(false, err);
                done();
            })
        });
    });
});


describe('api-tests', () => {
    after(() => {
        User.remove({});
        mongoose.connection.db.dropDatabase();
    });
    before(() => {
        const port = 3000;
        app.use(bodyParser.json());

        app.use('/', routes);
        app.listen(port, () => {
            assert.ok(true);
        });
    })

    it('create-user', function(done) {
        let userData = {
            "name": "User Test",
            "email": "test@test.com"
        };
        request.post({
            url: 'http://localhost:3000/users',
            body: userData,
            json: true
        }, function(err, response, body) {
            if(err) assert.ok(false, err);

            assert.equal(response.statusCode, 200);
            done();
        });
    });
    it('list-users', function(done) {
        request.get({
            url: 'http://localhost:3000/users'
        }, function(err, response, body) {
            if(err) assert.ok(false, err);
            assert.equal(JSON.parse(body)[0].name, "User Test");
            done();
        });
    });
});



