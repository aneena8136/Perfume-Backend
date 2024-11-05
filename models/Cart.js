const mongoose = require('mongoose');
const Perfume = require('../models/Perfume');


const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },     
  perfumes: [
    {
      perfumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Perfume' },
    },
  ],
});

module.exports = mongoose.model('Cart', cartSchema);
