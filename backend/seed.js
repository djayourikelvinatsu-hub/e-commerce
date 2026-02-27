const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Category = require('./models/Category');
const User = require('./models/User');
const connectDB = require('./config/database');

dotenv.config();
connectDB();

const products = [
    {
        name: "Classic White T-Shirt",
        price: 29.99,
        oldPrice: 39.99,
        category: "clothing",
        brand: "Hanes",
        images: [{
            url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop",
            isPrimary: true
        }],
        description: "Premium quality 100% cotton t-shirt with classic fit.",
        stock: 50,
        rating: 4.5,
        numReviews: 128,
        isFeatured: true,
        isOnSale: true,
        colors: ["White", "Black", "Gray"],
        sizes: ["XS", "S", "M", "L", "XL"]
    },
    {
        name: "Slim Fit Denim Jeans",
        price: 79.99,
        oldPrice: 99.99,
        category: "clothing",
        brand: "Levi's",
        images: [{
            url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop",
            isPrimary: true
        }],
        description: "Modern slim fit jeans with comfortable stretch denim.",
        stock: 35,
        rating: 4.3,
        numReviews: 89,
        isFeatured: true,
        isOnSale: true,
        colors: ["Blue", "Black"],
        sizes: ["28", "30", "32", "34", "36"]
    },
    {
        name: "Running Shoes",
        price: 129.99,
        oldPrice: 159.99,
        category: "footwear",
        brand: "Nike",
        images: [{
            url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop",
            isPrimary: true
        }],
        description: "Lightweight running shoes with responsive cushioning.",
        stock: 20,
        rating: 4.8,
        numReviews: 256,
        isFeatured: true,
        isNew: true,
        colors: ["Red/Black", "Blue/White"],
        sizes: ["7", "8", "9", "10", "11", "12"]
    },
    {
        name: "Leather Wallet",
        price: 49.99,
        oldPrice: 69.99,
        category: "accessories",
        brand: "Fossil",
        images: [{
            url: "https://images.unsplash.com/photo-1627123424574-7247585940ea?w=600&h=800&fit=crop",
            isPrimary: true
        }],
        description: "Genuine leather wallet with RFID blocking technology.",
        stock: 0,
        rating: 4.6,
        numReviews: 67,
        isFeatured: false,
        isOnSale: true,
        colors: ["Brown", "Black"]
    },
    {
        name: "Smart Watch",
        price: 199.99,
        oldPrice: 249.99,
        category: "electronics",
        brand: "Apple",
        images: [{
            url: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=800&fit=crop",
            isPrimary: true
        }],
        description: "Feature-packed smartwatch with health tracking.",
        stock: 15,
        rating: 4.7,
        numReviews: 342,
        isFeatured: true,
        isNew: true,
        colors: ["Space Gray", "Silver", "Gold"]
    },
    {
        name: "Laptop Backpack",
        price: 89.99,
        oldPrice: 109.99,
        category: "accessories",
        brand: "Herschel",
        images: [{
            url: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&h=800&fit=crop",
            isPrimary: true
        }],
        description: "Water-resistant backpack with padded laptop compartment.",
        stock: 45,
        rating: 4.4,
        numReviews: 178,
        isFeatured: true,
        isOnSale: true,
        colors: ["Black", "Navy", "Gray"]
    }
];

const categories = [
    { name: "Clothing", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=300&fit=crop" },
    { name: "Footwear", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop" },
    { name: "Accessories", image: "https://images.unsplash.com/photo-1523772721666-22ad3c3b6f90?w=400&h=300&fit=crop" },
    { name: "Electronics", image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=300&fit=crop" }
];

const importData = async () => {
    try {
        await Product.deleteMany();
        await Category.deleteMany();

        await Product.insertMany(products);
        await Category.insertMany(categories);

        console.log('Data imported successfully');
        process.exit();
    } catch (error) {
        console.error('Error importing data:', error);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Product.deleteMany();
        await Category.deleteMany();

        console.log('Data destroyed successfully');
        process.exit();
    } catch (error) {
        console.error('Error destroying data:', error);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}