const router = require('express').Router();

const housingService = require('../services/housingService');

router.get('/', async (req, res) => {
    let housings = await housingService.getAll();

    res.render('housing', {housings});
})

router.get('/create', (req, res) => {
    res.render('housing/create');
})

router.post('/create', async (req, res) => {
    let housingData = {...req.body, owner: req.user._id};

    await housingService.create(housingData);
    //todo error handling

    res.redirect('/housing');
})

module.exports = router;