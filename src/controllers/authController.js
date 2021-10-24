const router = require('express').Router();
const authService = require('../services/authService');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const {name, username, pass, repPass} = req.body;

    if(pass !== repPass){
        res.locals.error = "password mismatch";

        return res.render('auth/register');
    }

    await authService.register({name, username, password: pass});

    res.redirect('/');
})

module.exports = router;