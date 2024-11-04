const mongoose = require('mongoose');

const perfumeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
   
    image: {
        type: String,
    },
    price: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Perfume', perfumeSchema);