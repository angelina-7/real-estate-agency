const jwt = require('../utils/jwt');
const {AUTH_COOKIE_NAME, TOKEN_SECRET} = require('../constants');

exports.auth = function (req, res, next) {
    let token = req.cookies[AUTH_COOKIE_NAME];

    if(token){
        jwt.verify(token, TOKEN_SECRET)
            .then(decodedToken => {
                req.user = decodedToken;
                next();
            })
            .catch(err => {
                res.clearCookie(AUTH_COOKIE_NAME);
                res.redirect('/auth/login');
                // res.status(401).render('404');
            });
    }else {
        next();
    }
};

exports.isAuth = function (req, res, next) {
    if(req.user){
        next();
    } else {
        res.redirect('/auth/login');
        //todo
    }
};