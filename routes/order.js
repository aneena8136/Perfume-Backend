const express = require('express');
const router = express.Router();
const Cart = require('./../models/Cart')
const Perfume = require('../models/Perfume');
const  authMiddleware = require('../middleware/authMiddleware');




router.post('/add', async (req, res) => {
  try {
      const { userId, perfumeId } = req.body;

      const perfume = await Perfume.findById(perfumeId);

      if (!perfume) {
          return res.status(404).json({ error: 'Perfume not found' });
      }
    
      let cart = await Cart.findOne({ userId });

      if (!cart) {
          cart = new Cart({ userId, perfumes: [] });
      }

      cart.perfumes.push({ perfumeId });

      const totalPrice = cart.perfumes.reduce((total, item) => {
          const perfumeInCart = perfume; 
          return total + perfumeInCart.price;
      }, 0);

      let discount = 0;

      
      if (cart.perfumes.length === 5) {
          discount = 0.10; 
      } else if (cart.perfumes.length === 6) {
          discount = 0.15; 
      }

      
      if (totalPrice > 500) {
          discount += 0.05; 
      }

      
      const discountedPrice = totalPrice * (1 - discount); 

      cart.totalPrice = totalPrice;
      cart.discount = discount * 100;  
      cart.finalPrice = discountedPrice;

      await cart.save();

      res.json({
          cart,
      });

  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
  }
});

  
  

  router.get('/view', authMiddleware, async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.user.id })
        .populate({
          path: 'perfumes.perfumeId',
          model: 'Perfume',
          select: 'name price image ' // Select the fields you want to retrieve
        });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      res.json(cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });


module.exports = router;
