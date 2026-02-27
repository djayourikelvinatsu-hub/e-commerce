const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        console.error('❌ Error fetching products:', error);
        res.status(500).json({ success: false, message: 'Error fetching products' });
    }
});

// @route   GET /api/products/featured
// @desc    Get featured products
// @access  Public
router.get('/featured', async (req, res) => {
    try {
        const featured = await Product.find({ isFeatured: true }).limit(4);
        res.json({
            success: true,
            products: featured
        });
    } catch (error) {
        console.error('❌ Error fetching featured products:', error);
        res.status(500).json({ success: false, message: 'Error fetching featured products' });
    }
});

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.json({
            success: true,
            product
        });
    } catch (error) {
        console.error('❌ Error fetching product:', error);
        // Catch invalid ObjectId errors gracefully
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(500).json({ success: false, message: 'Error fetching product' });
    }
});

// @route   GET /api/products/category/:category
// @desc    Get products by category
// @access  Public
router.get('/category/:category', async (req, res) => {
    try {
        const categoryProducts = await Product.find({ category: req.params.category });

        res.json({
            success: true,
            count: categoryProducts.length,
            products: categoryProducts
        });
    } catch (error) {
        console.error('❌ Error fetching products by category:', error);
        res.status(500).json({ success: false, message: 'Error fetching products by category' });
    }
});

module.exports = router;