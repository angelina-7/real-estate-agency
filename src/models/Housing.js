const mongoose = require('mongoose');

const housingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [6, 'Name should be at leats 6 chars.']
    },
    type: {
        type: String,
        enum: ['Apartment', 'Villa', 'House'],
        required: true
    },
    year: {
        type: Number,
        required: true,
        min: [1850, 'Year built should be after 1850'],
        max: [2021, 'Year built should not be after 2021']
    },
    city: {
        type: String,
        required: true,
        minlength: [4, 'City should be at least 4 chars.']
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: [60, 'Description should be below 60 chars.']
    },
    availablePieces: {
        type: Number,
        required: true,
        min: [0, 'Available pieces cannot be below 0'],
        max: [10, 'Available pieces should be below or equal to 10']
    },
    tenants: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true,
});

housingSchema.method('getTenants', function () {
    return this.tenants.map(x => x.name).join(', ');
})

const Housing = mongoose.model('Housing', housingSchema);

module.exports = Housing;