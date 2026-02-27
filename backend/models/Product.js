const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true,
        maxlength: [100, 'Name cannot be more than 100 characters']
    },
    slug: String,
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        min: [0, 'Price must be positive']
    },
    oldPrice: {
        type: Number,
        min: [0, 'Old price must be positive']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    category: {
        type: String,
        required: [true, 'Please select a category'],
        enum: ['clothing', 'footwear', 'accessories', 'electronics']
    },
    subcategory: String,
    brand: String,
    images: [{
        url: String,
        publicId: String,
        isPrimary: { type: Boolean, default: false }
    }],
    stock: {
        type: Number,
        required: true,
        min: [0, 'Stock cannot be negative'],
        default: 0
    },
    rating: {
        type: Number,
        min: [0, 'Rating must be at least 0'],
        max: [5, 'Rating cannot be more than 5'],
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: String,
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        title: String,
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    colors: [String],
    sizes: [String],
    tags: [String],
    isFeatured: {
        type: Boolean,
        default: false
    },
    isNew: {
        type: Boolean,
        default: false
    },
    isOnSale: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Create slug from name
productSchema.pre('save', function (next) {
    this.slug = this.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
    next();
});

// Calculate average rating
productSchema.methods.calculateAverageRating = function () {
    if (this.reviews.length === 0) {
        this.rating = 0;
        this.numReviews = 0;
    } else {
        const sum = this.reviews.reduce((total, review) => total + review.rating, 0);
        this.rating = sum / this.reviews.length;
        this.numReviews = this.reviews.length;
    }
    return this.save();
};

module.exports = mongoose.model('Product', productSchema);