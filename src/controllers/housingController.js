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

router.get('/:housingId/details', async (req, res) => {
    let housing = await housingService.getOneById(req.params.housingId);

    let housingData = housing.toObject();
    let isOwner = housing.owner == req.user?._id;
    let tenants = housing.getTenants();
    let piecesLeft = housing.availablePieces - housing.tenants.length;
    let isAvailable = piecesLeft > 0;
    let isRented = housing.tenants.some(x => x._id == req.user?._id);

    res.render('housing/details', {...housingData, isOwner, tenants, piecesLeft, isAvailable, isRented});
});

router.get('/:housingId/rent', async (req, res) => {
    await housingService.addTenant(req.params.housingId, req.user._id);

    res.redirect(`/housing/${req.params.housingId}/details`)
})

module.exports = router;