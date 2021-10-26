const jwt = require('../utils/jwt');
const {AUTH_COOKIE_NAME, TOKEN_SECRET} = require('../constants');

const housingService = require('../services/housingService');

exports.auth = function (req, res, next) {
    let token = req.cookies[AUTH_COOKIE_NAME];

    if(token){
        jwt.verify(token, TOKEN_SECRET)
            .then(decodedToken => {
                req.user = decodedToken;
                res.locals.user = decodedToken;
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
    }
};

exports.isGuest = function (req, res, next) {
    if(!req.user){
        next();
    } else {
        res.redirect('/');
    }
};

exports.isNotOwner = async function (req, res, next) {
    try {
        let housing = await housingService.getOneById(req.params.housingId);
        let isOwner = housing.owner == req.user?._id;

        if (!isOwner) {
            next()
        } else {
            res.redirect(`/housing/${req.params.housingId}/details`);
        }
    } catch (error) {
        res.redirect('/housing');
    }
    
}

exports.isOwner = async function (req, res, next) {
    try {
        let housing = await housingService.getOneById(req.params.housingId);
        let isOwner = housing.owner == req.user?._id;

        if (isOwner) {
            next()
        } else {
            res.redirect(`/housing/${req.params.housingId}/details`);
        }
    } catch (error) {
        res.redirect('/housing');
    }
    
}