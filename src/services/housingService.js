const Housing = require('../models/Housing');

exports.create = (housingData) => {
    Housing.create(housingData);
};

exports.getAll = () => {
    return Housing.find().lean();
};

exports.getTopHouses = () => {
    return Housing.find().sort({createdAt: -1}).limit(3).lean();
};