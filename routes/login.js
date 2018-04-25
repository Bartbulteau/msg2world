var express = require('express');
var router = express.Router();


/* SET UP HASH */
var hash = require('./pass').hash;


/* SET UP DATABASE */
var mongoose = require('mongoose');
mongoose.connect('mongodb://bart:20BarT01@ds255329.mlab.com:55329/m2w');
var db = mongoose.connection;

// check connection
db.once('open', function () {
    console.log('Connected to MongoDB Users');
});

db.on('error', function (err) {
    console.log(err);
});

// bring in models
var User = require('../database/models/user');


/*
Helper Functions
*/
function authenticate(name, pass, fn) {
    if (!module.parent) console.log('authenticating %s:%s', name, pass);

    User.findOne({
        username: name
    },

        function (err, user) {
            if (user) {
                if (err) return fn(new Error('cannot find user'));
                hash(pass, user.salt, function (err, hash) {
                    if (err) return fn(err);
                    if (hash == user.hash) return fn(null, user);
                    fn(new Error('invalid password'));
                });
            } else {
                return fn(new Error('cannot find user'));
            }
        });

}

function requiredAuthentication(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
}

function userExist(req, res, next) {
    User.count({
        username: req.body.username
    }, function (err, count) {
        if (count === 0) {
            next();
        } else {
            req.session.error = "User Exist"
            res.redirect("/signup");
        }
    });
}



/* POST sign-up page */
router.post('/sign-up', function(req, res, next) {
    var user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    user.save(err => {
        if (err) {
            res.send(err)
        }
        else {
            res.send('Account created')
        }
    });
});

/* POST login page */
router.post('/', async function(req, res, next) {
    User.findOne({
        username: name
    },

    function (err, user) {
        if (user) {
            if (err) return null;
            hash(pass, user.salt, function (err, hash) {
                if (err) return fn(err);
                if (hash == user.hash) return fn(null, user);
                fn(new Error('invalid password'));
            });
        } else {
            return fn(new Error('cannot find user'));
        }
    });
});

/* GET users (during dev only) */
router.get('/getusers', function (req, res, next) {
    User.find({}, (err, users) => {
        if (err) {
            console.log('ERROR /!\\ : ');
            console.log(err);
            res.send(err);
        }
        else {
            res.json(users);
        }
    });
});



module.exports = router;