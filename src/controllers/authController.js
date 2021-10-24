const router = require('express').Router();
const authService = require('../services/authService');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { username, pass } = req.body;

    try {
        let token = await authService.login({ username, password: pass });

        //todo set token in httpOnly cookie

        res.redirect('/');
    } catch (error) {
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
        await authService.register({ name, username, password: pass });
        res.redirect('/');
    } catch (error) {
        //todo return error response
    }

});

module.exports = router;