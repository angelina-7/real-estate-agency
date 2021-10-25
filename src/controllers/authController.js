const router = require('express').Router();

const authService = require('../services/authService');
const {AUTH_COOKIE_NAME} = require('../constants');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { username, pass } = req.body;

    try {
        let token = await authService.login({ username, password: pass });

        res.cookie(AUTH_COOKIE_NAME, token);
        res.redirect('/');
    } catch (error) {
        res.end();
        //todo return error response
    }
    
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const { name, username, pass, repPass } = req.body;

    if (pass !== repPass) {
        res.locals.error = "password mismatch";

        return res.render('auth/register');
    }

    try {
        let isSaved = await authService.register({ name, username, password: pass });

        if(isSaved){
            let token = await authService.login({username, password: pass});
            res.cookie(AUTH_COOKIE_NAME, token);
        }
        
        res.redirect('/');
        
    } catch (error) {
        // console.log(error);
        //todo return error response
    }

});

router.get('/logout', (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);

    res.redirect('/');
})

module.exports = router;