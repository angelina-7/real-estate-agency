const router = require('express').Router();

const authService = require('../services/authService');
const {isGuest, isAuth} = require('../middlewares/authMiddleware');
const {getErrorMessage} = require('../utils/errorHandler');
const {AUTH_COOKIE_NAME} = require('../constants');

router.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
});

router.post('/login', isGuest, async (req, res) => {
    const { username, pass } = req.body;

    try {
        let token = await authService.login({ username, password: pass });

        res.cookie(AUTH_COOKIE_NAME, token);
        res.redirect('/');
    } catch (error) {
        res.locals.error = 'Invalid username or password.';
        res.render('auth/login');
    }
    
});

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

router.post('/register', isGuest, async (req, res) => {
    const { name, username, pass, repPass } = req.body;

    let validName = authService.validateFullName(name);
    let isValidPass = authService.validatePassword(pass, repPass);

    if (!validName) {
        res.locals.error = 'Full name should be in format: Alexander Petrov';
        return res.render('auth/register');
    } else if (!isValidPass){
        res.locals.error = "Password mismatch";
        return res.render('auth/register');
    }
    
    try {
        let isSaved = await authService.register({ name: validName, username, password: pass });

        if(isSaved){
            let token = await authService.login({username, password: pass});
            res.cookie(AUTH_COOKIE_NAME, token);
        }
        
        res.redirect('/');
        
    } catch (error) {
        res.render('auth/register', {error: getErrorMessage(error)});
    }

});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);

    res.redirect('/');
})

module.exports = router;