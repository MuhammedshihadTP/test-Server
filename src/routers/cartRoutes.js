const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addToCart, updateCartItem, removeFromCart, getUserCart } = require('../controller/cartController');

router.post('/add', auth, addToCart);
router.put('/update', auth, updateCartItem);
router.delete('/remove', auth, removeFromCart);
router.get('/user', auth, getUserCart);

module.exports = router;