const express = require('express');
const connectDB = require("./config/db");
const seedProducts = require('./data/seedProducts');
const authRoutes = require('./routers/authRoutes');
const productRoutes = require('./routers/productRoutes');
const cartRoutes = require('./routers/cartRoutes');
require('dotenv').config();
const app = express();


connectDB();
seedProducts();

app.use(express.json());



app.use('/api/users', authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/cart',cartRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
