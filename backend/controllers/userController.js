let User = require('../models/user');
let async = require('async');

let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let { createTokens, validateToken } = require('../crtptScure/JWT-cookie');

exports.all_users = (req, res) => {
    User.find()
        .exec((err, users) => {
            if(err)
                return next(err);
            
            res.json(users);
        })
};

exports.add_user = (req, res, next) => {
    bcrypt.hash(req.body.password, 12)
        .then(hashedPassword => {
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                admin: req.body.admin
            }, err => {
                if(err)
                    return next(err);
                
                res.status(200);
                res.send();
            })
        })
        .catch(err => {
            return next(err)
        });
}

exports.remove_user = (req, res, next) => {
    User.deleteOne({ _id: req.params.userId }, err => { 
        if(err) {
            return next(err);
        }

        res.status(200);
        res.send();
    });
}

exports.update_user = (req, res, next) => {
    bcrypt.hash(req.body.password, 12)
        .then(hashedPassword => {
            User.updateOne({ _id: req.params.userId }, 
            {   name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                admin: req.body.admin
            }, err => {
                if(err) {
                    return next(err);
                }
                
                res.status(200);
                res.send();
            });
        })
        .catch(err => {
            return next(err);
        });
}

exports.check_user = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if(err) {
                return next(err);
            }

            if(user == null) {
                return res.status(404).end();
            }

            bcrypt.compare( req.body.password, user.password )
                .then(match => {
                    if(!match)
                        return res.status(404).end();

                    // const accessToken = createTokens(user);
                    // res.cookie('access-token', accessToken, {
                    //     maxAge: 60 * 60 * 24 * 30 * 1000,
                    //     httpOnly: true,
                    // });
                    res.json(user);
                })
                .catch(err => {
                    return next(err);
                });
        })
}

exports.handleOther = (req, res) => {
    return res.status(404).end();
}
