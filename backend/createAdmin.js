const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '.env') });

// MongoDB connection string
const MONGODB_URI = 'mongodb://localhost:27017/shopease';

console.log('🔌 Connecting to MongoDB...');

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('✅ Connected to MongoDB successfully');
        createAdminUser();
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err.message);
        console.log('\n💡 Troubleshooting tips:');
        console.log('1. Make sure MongoDB is installed: brew install mongodb-community');
        console.log('2. Start MongoDB: brew services start mongodb-community');
        console.log('3. Check if MongoDB is running: brew services list');
        process.exit(1);
    });

async function createAdminUser() {
    try {
        // Define User Schema (temporary for this script)
        const userSchema = new mongoose.Schema({
            name: String,
            email: String,
            password: String,
            role: String,
            addresses: Array,
            wishlist: Array,
            createdAt: Date
        });

        const User = mongoose.model('User', userSchema);

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@shopease.com' });

        if (existingAdmin) {
            console.log('\n⚠️  Admin user already exists!');
            console.log('📧 Email: admin@shopease.com');
            console.log('🔑 Password: [use existing password]');
            console.log('📍 User ID:', existingAdmin._id);
            process.exit(0);
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        // Create new admin user
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@shopease.com',
            password: hashedPassword,
            role: 'admin',
            addresses: [{
                street: '123 Admin Street',
                city: 'New York',
                state: 'NY',
                zipCode: '10001',
                country: 'USA',
                isDefault: true
            }],
            wishlist: [],
            createdAt: new Date()
        });

        console.log('\n✅✅✅ SUCCESS! ✅✅✅');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🎉 Admin user created successfully!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📧 Email:    admin@shopease.com');
        console.log('🔑 Password: admin123');
        console.log('👤 Role:     Administrator');
        console.log('🆔 ID:       ' + admin._id);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('⚠️  Please change the password after first login!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    } catch (error) {
        console.error('❌ Error creating admin user:', error.message);
    } finally {
        // Close database connection
        await mongoose.connection.close();
        console.log('📡 Database connection closed');
        process.exit(0);
    }
}