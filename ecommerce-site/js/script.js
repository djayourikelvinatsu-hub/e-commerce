// Complete Product Data with Real Images
const products = [
    // Clothing Category
    {
        id: 1,
        name: "Classic White T-Shirt",
        price: 29.99,
        oldPrice: 39.99,
        category: "clothing",
        subcategory: "t-shirts",
        brand: "Hanes",
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=800&fit=crop"
        ],
        description: "Premium quality 100% cotton t-shirt. Classic fit with reinforced stitching.",
        stock: 50,
        rating: 4.5,
        reviews: 128,
        isNew: false,
        isSale: true
    },
    {
        id: 2,
        name: "Slim Fit Denim Jeans",
        price: 79.99,
        oldPrice: 99.99,
        category: "clothing",
        subcategory: "jeans",
        brand: "Levi's",
        images: [
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1604176424472-9d7e1f3b1e5a?w=600&h=800&fit=crop"
        ],
        description: "Modern slim fit jeans with just the right amount of stretch.",
        stock: 35,
        rating: 4.3,
        reviews: 89,
        isNew: false,
        isSale: true
    },
    {
        id: 9,
        name: "Women's Summer Dress",
        price: 59.99,
        oldPrice: 79.99,
        category: "clothing",
        subcategory: "dresses",
        brand: "Zara",
        images: [
            "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&h=800&fit=crop"
        ],
        description: "Lightweight and breezy summer dress perfect for warm days.",
        stock: 25,
        rating: 4.7,
        reviews: 56,
        isNew: true,
        isSale: true
    },
    {
        id: 10,
        name: "Men's Casual Blazer",
        price: 149.99,
        oldPrice: 199.99,
        category: "clothing",
        subcategory: "jackets",
        brand: "Hugo Boss",
        images: [
            "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&h=800&fit=crop"
        ],
        description: "Versatile casual blazer that can be dressed up or down.",
        stock: 15,
        rating: 4.6,
        reviews: 34,
        isNew: true,
        isSale: false
    },

    // Footwear Category
    {
        id: 3,
        name: "Running Shoes",
        price: 129.99,
        oldPrice: 159.99,
        category: "footwear",
        subcategory: "sports",
        brand: "Nike",
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=800&fit=crop"
        ],
        description: "Lightweight running shoes with responsive cushioning.",
        stock: 20,
        rating: 4.8,
        reviews: 256,
        isNew: true,
        isSale: false
    },
    {
        id: 11,
        name: "Leather Chelsea Boots",
        price: 189.99,
        oldPrice: 239.99,
        category: "footwear",
        subcategory: "boots",
        brand: "Timberland",
        images: [
            "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1520215403050-0c4f4b2dffb9?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?w=600&h=800&fit=crop"
        ],
        description: "Classic Chelsea boots crafted from premium full-grain leather.",
        stock: 18,
        rating: 4.7,
        reviews: 67,
        isNew: false,
        isSale: true
    },
    {
        id: 12,
        name: "Women's Sandals",
        price: 49.99,
        oldPrice: 69.99,
        category: "footwear",
        subcategory: "sandals",
        brand: "Birkenstock",
        images: [
            "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1605733513597-8434b7b8f9d3?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1623851788289-33f1ee01a72f?w=600&h=800&fit=crop"
        ],
        description: "Comfortable and stylish sandals with contoured footbed.",
        stock: 42,
        rating: 4.5,
        reviews: 89,
        isNew: false,
        isSale: true
    },

    // Accessories Category
    {
        id: 4,
        name: "Leather Wallet",
        price: 49.99,
        oldPrice: 69.99,
        category: "accessories",
        subcategory: "wallets",
        brand: "Fossil",
        images: [
            "https://images.unsplash.com/photo-1627123424574-7247585940ea?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1606503825008-909a67e63c3d?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1559565092-8b6f0b86c7b0?w=600&h=800&fit=crop"
        ],
        description: "Genuine leather wallet with RFID blocking technology.",
        stock: 0,
        rating: 4.6,
        reviews: 67,
        isNew: false,
        isSale: true
    },
    {
        id: 5,
        name: "Smart Watch",
        price: 199.99,
        oldPrice: 249.99,
        category: "electronics",
        subcategory: "wearables",
        brand: "Apple",
        images: [
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&h=800&fit=crop"
        ],
        description: "Feature-packed smartwatch with health tracking and notifications.",
        stock: 15,
        rating: 4.7,
        reviews: 342,
        isNew: true,
        isSale: false
    },
    {
        id: 6,
        name: "Laptop Backpack",
        price: 89.99,
        oldPrice: 109.99,
        category: "accessories",
        subcategory: "bags",
        brand: "Herschel",
        images: [
            "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1622560480654-9629eaa9d3b3?w=600&h=800&fit=crop"
        ],
        description: "Water-resistant backpack with padded laptop compartment.",
        stock: 45,
        rating: 4.4,
        reviews: 178,
        isNew: false,
        isSale: true
    },
    {
        id: 7,
        name: "Wireless Headphones",
        price: 149.99,
        oldPrice: 199.99,
        category: "electronics",
        subcategory: "audio",
        brand: "Sony",
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=800&fit=crop"
        ],
        description: "Premium wireless headphones with active noise cancellation.",
        stock: 28,
        rating: 4.9,
        reviews: 567,
        isNew: true,
        isSale: false
    },
    {
        id: 8,
        name: "Sunglasses",
        price: 159.99,
        oldPrice: 199.99,
        category: "accessories",
        subcategory: "eyewear",
        brand: "Ray-Ban",
        images: [
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1577803645770-f5ab33d3fd57?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&h=800&fit=crop"
        ],
        description: "Polarized sunglasses with UV protection and stylish design.",
        stock: 12,
        rating: 4.5,
        reviews: 89,
        isNew: false,
        isSale: true
    }
];

// Categories Data with Images
const categories = [
    {
        id: 1,
        name: "Clothing",
        image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=300&fit=crop",
        count: 25
    },
    {
        id: 2,
        name: "Footwear",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
        count: 18
    },
    {
        id: 3,
        name: "Accessories",
        image: "https://images.unsplash.com/photo-1523772721666-22ad3c3b6f90?w=400&h=300&fit=crop",
        count: 32
    },
    {
        id: 4,
        name: "Electronics",
        image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=300&fit=crop",
        count: 15
    }
];

// Shopping Cart Class
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartCount();
    }

    loadCart() {
        try {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    }

    saveCart() {
        try {
            localStorage.setItem('cart', JSON.stringify(this.items));
            this.updateCartCount();
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    addItem(productId, quantity = 1) {
        const product = products.find(p => p.id === productId);

        if (!product) {
            this.showNotification('Product not found', 'error');
            return false;
        }

        if (product.stock < quantity) {
            this.showNotification('Insufficient stock', 'error');
            return false;
        }

        const existingItem = this.items.find(item => item.id === productId);

        if (existingItem) {
            if (product.stock >= existingItem.quantity + quantity) {
                existingItem.quantity += quantity;
            } else {
                this.showNotification('Insufficient stock', 'error');
                return false;
            }
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                quantity: quantity,
                stock: product.stock
            });
        }

        this.saveCart();
        this.showNotification(`${product.name} added to cart!`);
        return true;
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.showNotification('Item removed from cart');
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);

        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                const product = products.find(p => p.id === productId);
                if (product && product.stock >= quantity) {
                    item.quantity = quantity;
                    this.saveCart();
                } else {
                    this.showNotification('Insufficient stock', 'error');
                }
            }
        }
    }

    getSubtotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    clearCart() {
        if (confirm('Are you sure you want to clear your cart?')) {
            this.items = [];
            this.saveCart();
            this.showNotification('Cart cleared');
        }
    }

    updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const count = this.getItemCount();

        cartCountElements.forEach(element => {
            element.textContent = count;
            element.style.display = count > 0 ? 'inline' : 'none';
        });
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `toast ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            animation: slideIn 0.3s ease;
            z-index: 3000;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize cart
const cart = new ShoppingCart();

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Load categories on homepage
    loadCategories();

    // Load featured products on homepage
    loadFeaturedProducts();

    // Initialize event listeners
    initializeEventListeners();

    // Update cart count
    cart.updateCartCount();
});

// Load categories
function loadCategories() {
    const categoryGrid = document.getElementById('categoryGrid');
    if (!categoryGrid) return;

    categoryGrid.innerHTML = categories.map(category => `
        <div class="category-card" onclick="window.location.href='products.html?category=${category.name.toLowerCase()}'">
            <img src="${category.image}" alt="${category.name}">
            <h3>${category.name} <span>(${category.count})</span></h3>
        </div>
    `).join('');
}

// Load featured products
function loadFeaturedProducts() {
    const productsGrid = document.getElementById('featuredProducts');
    if (!productsGrid) return;

    // Get first 6 products as featured
    const featuredProducts = products.slice(0, 6);

    productsGrid.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            ${product.stock === 0 ? '<span class="product-badge">Out of Stock</span>' : ''}
            ${product.isSale ? '<span class="product-badge sale">Sale</span>' : ''}
            ${product.isNew ? '<span class="product-badge new">New</span>' : ''}
            <div class="product-image-container">
                <img src="${product.images[0]}" alt="${product.name}" class="product-image" 
                     onclick="window.location.href='product-detail.html?id=${product.id}'">
                <div class="product-actions">
                    <button class="action-btn" onclick="addToWishlist(${product.id})" title="Add to Wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="action-btn" onclick="quickView(${product.id})" title="Quick View">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title" onclick="window.location.href='product-detail.html?id=${product.id}'">${product.name}</h3>
                <div class="product-price">
                    $${product.price.toFixed(2)}
                    ${product.oldPrice ? `<del>$${product.oldPrice.toFixed(2)}</del>` : ''}
                </div>
                <div class="product-rating">
                    ${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 ? '½' : ''}
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <button class="btn btn-primary btn-add-to-cart" 
                        onclick="cart.addItem(${product.id})"
                        ${product.stock === 0 ? 'disabled' : ''}>
                    ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </div>
    `).join('');
}

// Add to cart function (global)
window.addToCart = function (productId) {
    cart.addItem(productId);
};

// Quick view function
window.quickView = function (productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('quickViewModal');
    const content = document.getElementById('quickViewContent');

    content.innerHTML = `
        <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
            <img src="${product.images[0]}" alt="${product.name}" 
                 style="width: 300px; height: 400px; object-fit: cover; border-radius: 8px;">
            <div style="flex: 1;">
                <h2>${product.name}</h2>
                <div style="color: var(--warning-color); margin: 0.5rem 0;">
                    ${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 ? '½' : ''}
                    <span style="color: var(--text-light);">(${product.reviews} reviews)</span>
                </div>
                <div style="font-size: 2rem; color: var(--primary-color); margin: 1rem 0;">
                    $${product.price.toFixed(2)}
                    ${product.oldPrice ? `<span style="font-size: 1.2rem; color: var(--text-light); text-decoration: line-through; margin-left: 1rem;">$${product.oldPrice.toFixed(2)}</span>` : ''}
                </div>
                <p>${product.description}</p>
                <p style="margin: 1rem 0; color: ${product.stock > 0 ? 'green' : 'red'};">
                    ${product.stock > 0 ? `✓ In Stock (${product.stock} available)` : '✗ Out of Stock'}
                </p>
                <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                    <button class="btn btn-primary" onclick="addToCartFromQuickView(${product.id})" 
                            ${product.stock === 0 ? 'disabled' : ''}>
                        Add to Cart
                    </button>
                    <button class="btn btn-outline" onclick="addToWishlist(${product.id})">
                        <i class="far fa-heart"></i> Add to Wishlist
                    </button>
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'block';

    // Close modal
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.style.display = 'none';

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
};

// Add to cart from quick view
window.addToCartFromQuickView = function (productId) {
    cart.addItem(productId);
    document.getElementById('quickViewModal').style.display = 'none';
};

// Wishlist functions
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

window.addToWishlist = function (productId) {
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        cart.showNotification('Added to wishlist');
    } else {
        wishlist = wishlist.filter(id => id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        cart.showNotification('Removed from wishlist');
    }
};

// Initialize event listeners
function initializeEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', () => {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                cart.showNotification('Please enter a valid email', 'error');
                return;
            }

            cart.showNotification('Thank you for subscribing!');
            newsletterForm.reset();
        });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const navIcons = document.querySelector('.nav-icons');
            navIcons.classList.toggle('show');
        });
    }
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .product-card {
        cursor: pointer;
    }
    
    .product-title {
        cursor: pointer;
    }
    
    .product-title:hover {
        color: var(--primary-color);
    }
`;
document.head.appendChild(style);