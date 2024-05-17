const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAllProducts } = require('../controller/productController');

// Public routes
router.get('/', auth, getAllProducts);

module.exports = router;