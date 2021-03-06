const Housing = require('../models/Housing');

exports.create = (housingData) => {
    return Housing.create(housingData);
};

exports.getAll = () => {
    return Housing.find().lean();
};

exports.getAllByType = (type) => {
    return Housing.find({type: {$regex: type, $options: 'i'}}).lean();
};

exports.getTopHouses = () => {
    return Housing.find().sort({ createdAt: -1 }).limit(3).lean();
};

exports.getOneById = (_id) => {
    return Housing.findById(_id).populate('tenants');
};

exports.addTenant = (housingId, tenantId) => {
    return Housing.findOneAndUpdate({_id: housingId}, { $push: {tenants: tenantId}}); // $inc: { availablePieces: -1 }
};

exports.updateOne = (housingId, housingData) => {
    return Housing.findByIdAndUpdate(housingId, housingData, {runValidators: true});
};

exports.delete = (housingId) => {
    return Housing.findByIdAndDelete(housingId);
};