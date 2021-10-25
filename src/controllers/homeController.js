const router = require('express').Router();

const housingService = require('../services/housingService');

router.get('/', async (req, res) => {
    let housings = await housingService.getTopHouses();
    
    res.render('home', {title: 'Home', housings});
});

module.exports = router;