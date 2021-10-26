const Housing = require('../models/Housing');

exports.create = (housingData) => {
    Housing.create(housingData);
};

exports.getAll = () => {
    return Housing.find().lean();
};

exports.getTopHouses = () => {
    return Housing.find().sort({ createdAt: -1 }).limit(3).lean();
};

exports.getOneById = (_id) => {
    return Housing.findById(_id).populate('tenants');
};

exports.addTenant = (housingId, tenantId) => {
    return Housing.findOneAndUpdate({_id: housingId}, { $push: {tenants: tenantId}});
};