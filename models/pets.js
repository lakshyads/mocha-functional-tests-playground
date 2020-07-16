const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: {
        required: true,
        type: mongoose.Schema.Types.String
    },
    age: {
        required: true,
        type: mongoose.Schema.Types.Number
    },
    colour: {
        required: true,
        type: mongoose.Schema.Types.String
    },
});

module.exports = mongoose.model('Pets', PetSchema);