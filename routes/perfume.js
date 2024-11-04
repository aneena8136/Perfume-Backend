const express = require('express');
const router = express.Router();
const Perfume = require('../models/Perfume');
router.get('/view', async (req, res) => {
    try {
        const perfumes = await Perfume.find();
        res.json(perfumes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;