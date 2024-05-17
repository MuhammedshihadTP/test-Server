const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/product');

const seedProducts = async () => {
    await connectDB();

    try {
        
        const existingProducts = await Product.find();
        if (existingProducts.length > 0) {
            console.log('Products already seeded!');
           
            return;
        }

       
        const products = [
            {
                name: 'Laptop',
                price: 1200,
                description: '15.6" Full HD, Intel Core i7, 16GB RAM, 512GB SSD',
                category: 'Electronics',
                stock: 50,
            },
            {
                name: 'Smartphone',
                price: 800,
                description: '6.5" AMOLED, 128GB Storage, 8GB RAM, Triple Camera',
                category: 'Electronics',
                stock: 100,
            },
            {
                name: 'Running Shoes',
                price: 120,
                description: 'Men\'s Size 10, Lightweight and Breathable',
                category: 'Sports',
                stock: 30,
            },
            {
                name: 'Coffee Maker',
                price: 50,
                description: '12-Cup Programmable, Stainless Steel',
                category: 'Home & Kitchen',
                stock: 20,
            },
        ];

        await Product.insertMany(products);
        console.log('Products seeded!');
       
    } catch (err) {
        console.error(err);
       
    }
};

module.exports = seedProducts;
