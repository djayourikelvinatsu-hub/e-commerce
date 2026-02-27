const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5500',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopease', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB Connected:', conn.connection.host);
        return conn;
    } catch (error) {
        console.error('❌ Database connection error:', error.message);
        console.log('⚠️  Continuing without database...');
        return null;
    }
};

// Connect to database (but don't crash if it fails)
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// Health check route
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        time: new Date().toISOString(),
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// Base route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to ShopEase API',
        version: '1.0.0',
        status: 'running',
        endpoints: {
            auth: '/api/auth',
            products: '/api/products',
            orders: '/api/orders',
            users: '/api/users',
            health: '/health'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Handle 404
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Cannot ${req.method} ${req.originalUrl}`,
        availableEndpoints: [
            'GET /',
            'GET /health',
            'POST /api/auth/login',
            'POST /api/auth/register',
            'GET /api/products',
            'GET /api/products/featured'
        ]
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 SERVER STARTED SUCCESSFULLY!');
    console.log('='.repeat(60));
    console.log(`📍 Server running on: http://localhost:${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📍 Database: ${mongoose.connection.readyState === 1 ? '✅ Connected' : '⚠️  Not connected'}`);
    console.log('='.repeat(60));
    console.log('📡 Available endpoints:');
    console.log(`   - Home:      http://localhost:${PORT}`);
    console.log(`   - Health:    http://localhost:${PORT}/health`);
    console.log(`   - Products:  http://localhost:${PORT}/api/products`);
    console.log(`   - Featured:  http://localhost:${PORT}/api/products/featured`);
    console.log(`   - Auth:      http://localhost:${PORT}/api/auth`);
    console.log('='.repeat(60) + '\n');
});