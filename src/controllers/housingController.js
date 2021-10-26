const router = require('express').Router();

const {isAuth, isNotOwner, isOwner} = require('../middlewares/authMiddleware');
const {getErrorMessage} = require('../utils/errorHandler');
const housingService = require('../services/housingService');

router.get('/', async (req, res) => {
    let housings = await housingService.getAll();

    res.render('housing', {housings});
})

router.get('/create', isAuth, (req, res) => {
    res.render('housing/create');
})

router.post('/create', isAuth, async (req, res) => {
    //todo verify url
    try {
        let housingData = {...req.body, owner: req.user._id};
        await housingService.create(housingData);

        res.redirect('/housing');
    } catch (error) {
        res.render('housing/create', {error: getErrorMessage(error)});
    }
    
})

router.get('/:housingId/details', async (req, res) => {
    try {
        let housing = await housingService.getOneById(req.params.housingId);

        let housingData = housing.toObject();
        let isOwner = housing.owner == req.user?._id;
        let tenants = housing.getTenants();
        let piecesLeft = housing.availablePieces - housing.tenants.length;
        let isAvailable = piecesLeft > 0;
        let isRented = housing.tenants.some(x => x._id == req.user?._id);

        res.render('housing/details', {...housingData, isOwner, tenants, piecesLeft, isAvailable, isRented});
    } catch (error) {
        res.redirect('/housing');
    }
    
});

router.get('/:housingId/rent', isNotOwner, async (req, res) => {
    await housingService.addTenant(req.params.housingId, req.user._id);

    res.redirect(`/housing/${req.params.housingId}/details`);
    
});

router.get('/:housingId/delete', isOwner, async (req, res) => {
    await housingService.delete(req.params.housingId);

    res.redirect('/housing');
});

router.get('/:housingId/edit', isOwner, async (req, res) => {
    let housing = await housingService.getOneById(req.params.housingId);

    let housingData = housing.toObject();

    res.render('housing/edit', housingData);
});

router.post('/:housingId/edit', isOwner, async (req, res) => {
    try {
        await housingService.updateOne(req.params.housingId, req.body);

        res.redirect(`/housing/${req.params.housingId}/details`);
    } catch (error) {
        let housing = await housingService.getOneById(req.params.housingId);
        let housingData = housing.toObject();

        res.render('housing/edit', {...housingData, error: getErrorMessage(error)});
    }
    
});

router.get('/search', async (req, res) => {
    let housings = await housingService.getAll();
    res.render('housing/search', {housings});
    //note GET: search param in -> req.query.type
});

router.post('/search', async (req, res) => {
    let housings = await housingService.getAllByType(req.body.type);

    res.render('housing/search', {housings});
});

module.exports = router;