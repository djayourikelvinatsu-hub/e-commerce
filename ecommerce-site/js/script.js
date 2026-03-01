// API Configuration - use env or fallback for dev
const API_BASE = (typeof window !== 'undefined' && window.API_URL) || 'http://localhost:5000';

// Normalize product from API (images array of objects) to frontend format
function normalizeProduct(p) {
    if (!p) return null;
    const id = p._id || p.id;
    const img = p.images && p.images[0];
    const imageUrl = typeof img === 'string' ? img : (img && img.url) || (p.images && p.images[0]);
    return {
        id: id,
        _id: p._id || id,
        name: p.name,
        price: p.price,
        oldPrice: p.oldPrice,
        category: p.category,
        subcategory: p.subcategory,
        brand: p.brand,
        images: Array.isArray(p.images)
            ? p.images.map(i => (typeof i === 'string' ? i : i && i.url)).filter(Boolean)
            : [imageUrl],
        description: p.description,
        stock: p.stock ?? 0,
        rating: p.rating ?? 0,
        reviews: p.numReviews ?? p.reviews ?? 0,
        isNew: p.isNew ?? false,
        isSale: p.isOnSale ?? p.isSale ?? false
    };
}

// Fetch products from API, fallback to hardcoded
async function fetchProducts() {
    try {
        const res = await fetch(`${API_BASE}/api/products`);
        const data = await res.json();
        if (data.success && data.products) {
            products = data.products.map(normalizeProduct);
            return products;
        }
    } catch (e) {
        console.warn('API unavailable, using fallback products');
    }
    return products;
}

async function fetchCategories() {
    try {
        const res = await fetch(`${API_BASE}/api/products`);
        const data = await res.json();
        if (data.success && data.products) {
            const cats = {};
            data.products.forEach(p => {
                const c = (p.category || '').toLowerCase();
                if (c && !cats[c]) cats[c] = { name: c.charAt(0).toUpperCase() + c.slice(1), count: 0 };
                if (cats[c]) cats[c].count++;
            });
            return Object.values(cats).map((c, i) => ({
                id: i + 1,
                name: c.name,
                image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=300&fit=crop',
                count: c.count
            }));
        }
    } catch (e) {}
    return null;
}

// Complete Product Data with Real Images (fallback when API unavailable)
let products = [
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
        const pid = String(productId);
        const product = products.find(p => String(p._id || p.id) === pid);

        if (!product) {
            this.showNotification('Product not found', 'error');
            return false;
        }

        if (product.stock < quantity) {
            this.showNotification('Insufficient stock', 'error');
            return false;
        }

        const existingItem = this.items.find(item => String(item.id) === pid);

        if (existingItem) {
            if (product.stock >= existingItem.quantity + quantity) {
                existingItem.quantity += quantity;
            } else {
                this.showNotification('Insufficient stock', 'error');
                return false;
            }
        } else {
            this.items.push({
                id: product._id || product.id,
                name: product.name,
                price: product.price,
                image: (product.images && product.images[0]) || '',
                quantity: quantity,
                stock: product.stock
            });
        }

        this.saveCart();
        this.showNotification(`${product.name} added to cart!`);
        return true;
    }

    removeItem(productId) {
        const pid = String(productId);
        this.items = this.items.filter(item => String(item.id) !== pid);
        this.saveCart();
        this.showNotification('Item removed from cart');
    }

    updateQuantity(productId, quantity) {
        const pid = String(productId);
        const item = this.items.find(item => String(item.id) === pid);

        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                const product = products.find(p => String(p._id || p.id) === String(productId));
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

// Category images by name
const categoryImages = {
    clothing: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=300&fit=crop',
    footwear: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
    accessories: 'https://images.unsplash.com/photo-1523772721666-22ad3c3b6f90?w=400&h=300&fit=crop',
    electronics: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=300&fit=crop'
};

// DOM Elements
document.addEventListener('DOMContentLoaded', async () => {
    // Fetch products from API first
    await fetchProducts();

    // Load categories on homepage
    await loadCategories();

    // Load featured products on homepage
    loadFeaturedProducts();

    // Initialize event listeners
    initializeEventListeners();

    // Update cart count
    cart.updateCartCount();
});

// Load categories (from API or fallback)
async function loadCategories() {
    const categoryGrid = document.getElementById('categoryGrid');
    if (!categoryGrid) return;

    let cats = await fetchCategories();
    if (!cats || cats.length === 0) {
        cats = categories.map((c, i) => ({
            ...c,
            image: categoryImages[c.name.toLowerCase()] || c.image
        }));
    } else {
        cats = cats.map(c => ({
            ...c,
            image: categoryImages[c.name.toLowerCase()] || categoryImages.clothing
        }));
    }

    categoryGrid.innerHTML = cats.map(category => `
        <div class="category-card" onclick="window.location.href='products.html?category=${category.name.toLowerCase()}'">
            <img src="${category.image}" alt="${category.name}">
            <h3>${category.name} <span>(${category.count || 0})</span></h3>
        </div>
    `).join('');
}

// Load featured products
function loadFeaturedProducts() {
    const productsGrid = document.getElementById('featuredProducts');
    if (!productsGrid) return;

    const featured = products.filter(p => p.isSale || p.isNew).slice(0, 6);
    const featuredProducts = featured.length >= 4 ? featured : products.slice(0, 6);

    productsGrid.innerHTML = featuredProducts.map(product => {
        const pid = product._id || product.id;
        const img0 = (product.images && product.images[0]) || '';
        const pidStr = typeof pid === 'string' ? `'${pid}'` : pid;
        return `
        <div class="product-card">
            ${product.stock === 0 ? '<span class="product-badge">Out of Stock</span>' : ''}
            ${product.isSale ? '<span class="product-badge sale">Sale</span>' : ''}
            ${product.isNew ? '<span class="product-badge new">New</span>' : ''}
            <div class="product-image-container">
                <img src="${img0}" alt="${product.name}" class="product-image" 
                     onclick="window.location.href='product-detail.html?id=${pid}'">
                <div class="product-actions">
                    <button class="action-btn" onclick="addToWishlist('${pid}')" title="Add to Wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="action-btn" onclick="quickView('${pid}')" title="Quick View">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title" onclick="window.location.href='product-detail.html?id=${pid}'">${product.name}</h3>
                <div class="product-price">
                    $${product.price.toFixed(2)}
                    ${product.oldPrice ? `<del>$${product.oldPrice.toFixed(2)}</del>` : ''}
                </div>
                <div class="product-rating">
                    ${'★'.repeat(Math.floor(product.rating || 0))}${(product.rating || 0) % 1 ? '½' : ''}
                    <span class="rating-count">(${product.reviews || 0})</span>
                </div>
                <button class="btn btn-primary btn-add-to-cart" 
                        onclick="cart.addItem('${pid}')"
                        ${product.stock === 0 ? 'disabled' : ''}>
                    ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </div>
    `}).join('');
}

// Add to cart function (global)
window.addToCart = function (productId) {
    cart.addItem(productId);
};

// Quick view function
window.quickView = function (productId) {
    const product = products.find(p => String(p._id || p.id) === String(productId));
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
                    <button class="btn btn-primary" onclick="addToCartFromQuickView('${product._id || product.id}')"
                            ${product.stock === 0 ? 'disabled' : ''}>
                        Add to Cart
                    </button>
                    <button class="btn btn-outline" onclick="addToWishlist('${product._id || product.id}')">
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

window.addToWishlist = async function (productId) {
    const pid = String(productId);
    const inList = wishlist.some(id => String(id) === pid);
    if (auth.token && auth.user) {
        try {
            if (inList) {
                const res = await fetch(`${API_BASE}/api/users/wishlist/${pid}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${auth.token}` }
                });
                if (res.ok) {
                    wishlist = wishlist.filter(id => String(id) !== pid);
                    localStorage.setItem('wishlist', JSON.stringify(wishlist));
                    cart.showNotification('Removed from wishlist');
                }
            } else {
                const res = await fetch(`${API_BASE}/api/users/wishlist/${pid}`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${auth.token}` }
                });
                const data = await res.json();
                if (data.success) {
                    wishlist = [...wishlist, pid];
                    localStorage.setItem('wishlist', JSON.stringify(wishlist));
                    cart.showNotification('Added to wishlist');
                } else {
                    cart.showNotification(data.message || 'Failed', 'error');
                }
            }
        } catch (e) {
            if (inList) {
                wishlist = wishlist.filter(id => String(id) !== pid);
            } else {
                wishlist.push(pid);
            }
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            cart.showNotification(inList ? 'Removed from wishlist' : 'Added to wishlist');
        }
    } else {
        if (inList) {
            wishlist = wishlist.filter(id => String(id) !== pid);
            cart.showNotification('Removed from wishlist');
        } else {
            wishlist.push(pid);
            cart.showNotification('Added to wishlist');
        }
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
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
        color: #c45500;
    }
`;
document.head.appendChild(style);
// --- Authentication Logic ---
window.auth = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,

    init() {
        this.injectAuthModal();
        this.updateHeaderUI();
        this.attachEventListeners();
    },

    injectAuthModal() {
        if (document.getElementById('authModal')) return;

        const modalHTML = `
            <div id="authModal" class="modal amazon-auth-modal">
                <span class="close amazon-close" onclick="auth.closeModal()">&times;</span>
                <div class="amazon-auth-container">
                    <!-- Logo Header -->
                    <div class="amazon-logo-container" onclick="auth.closeModal()" style="cursor: pointer;" title="Back to ShopEase">
                        <h1 class="amazon-logo">ShopEase</h1>
                    </div>

                    <!-- Main Login Card -->
                    <div class="amazon-card" id="loginCard">
                        <h2>Sign in</h2>
                        <form id="loginForm" onsubmit="auth.handleLogin(event)">
                            <div class="amazon-form-group">
                                <label for="loginEmail">Email</label>
                                <input type="email" id="loginEmail" class="amazon-input" required>
                            </div>
                            <div class="amazon-form-group" style="margin-top: 15px;">
                                <div style="display: flex; justify-content: space-between;">
                                    <label for="loginPassword">Password</label>
                                    <a href="#" class="amazon-link" style="font-size: 13px;">Forgot your password?</a>
                                </div>
                                <input type="password" id="loginPassword" class="amazon-input" required>
                            </div>
                            <button type="submit" class="amazon-btn amazon-btn-primary" style="margin-top: 15px; width: 100%;">Continue</button>
                        </form>
                        <div class="amazon-legal">
                            By continuing, you agree to ShopEase's <a href="#" class="amazon-link">Conditions of Use</a> and <a href="#" class="amazon-link">Privacy Notice</a>.
                        </div>
                        
                        <div class="amazon-divider">
                            <h5>New to ShopEase?</h5>
                        </div>
                        <button type="button" class="amazon-btn amazon-btn-secondary" style="width: 100%;" onclick="auth.switchTab('register')">Create your ShopEase account</button>
                    </div>

                    <!-- Main Register Card -->
                    <div class="amazon-card" id="registerCard" style="display: none;">
                        <h2>Create account</h2>
                        <form id="registerForm" onsubmit="auth.handleRegister(event)">
                            <div class="amazon-form-group">
                                <label for="registerName">Your name</label>
                                <input type="text" id="registerName" class="amazon-input" required placeholder="First and last name">
                            </div>
                            <div class="amazon-form-group" style="margin-top: 15px;">
                                <label for="registerEmail">Email</label>
                                <input type="email" id="registerEmail" class="amazon-input" required>
                            </div>
                            <div class="amazon-form-group" style="margin-top: 15px;">
                                <label for="registerPassword">Password</label>
                                <input type="password" id="registerPassword" class="amazon-input" required minlength="6" placeholder="At least 6 characters">
                                <div class="amazon-password-hint"><i class="fas fa-info-circle"></i> Passwords must be at least 6 characters.</div>
                            </div>
                            <button type="submit" class="amazon-btn amazon-btn-primary" style="margin-top: 15px; width: 100%;">Continue</button>
                        </form>
                         <div class="amazon-legal">
                            By creating an account, you agree to ShopEase's <a href="#" class="amazon-link">Conditions of Use</a> and <a href="#" class="amazon-link">Privacy Notice</a>.
                        </div>
                        
                        <div class="amazon-divider" style="margin-top: 20px; border-top-color: transparent; box-shadow: 0 1px 0 rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.5);"></div>
                        <div class="amazon-legal" style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee;">
                            Already have an account? <a href="#" class="amazon-link" onclick="auth.switchTab('login')">Sign in <i class="fas fa-caret-right"></i></a>
                        </div>
                    </div>
                    
                    <div class="amazon-footer">
                        <div class="amazon-footer-links">
                            <a href="#">Conditions of Use</a>
                            <a href="#">Privacy Notice</a>
                            <a href="#">Help</a>
                        </div>
                        <p>© 2024, ShopEase.com, Inc. or its affiliates</p>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    },

    switchTab(tab) {
        const loginCard = document.getElementById('loginCard');
        const registerCard = document.getElementById('registerCard');

        if (tab === 'login') {
            loginCard.style.display = 'block';
            registerCard.style.display = 'none';
        } else {
            loginCard.style.display = 'none';
            registerCard.style.display = 'block';
        }
    },

    openModal() {
        document.getElementById('authModal').style.display = 'block';
    },

    closeModal() {
        document.getElementById('authModal').style.display = 'none';
    },

    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const res = await fetch(`${API_BASE}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (data.success) {
                this.setSession(data.token, data.user);
                this.closeModal();
                cart.showNotification('Successfully signed in!');
                document.getElementById('loginForm').reset();
            } else {
                cart.showNotification(data.message || 'Login failed', 'error');
            }
        } catch (err) {
            console.error(err);
            cart.showNotification('Network error occurred. Is backend running?', 'error');
        }
    },

    async handleRegister(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        try {
            const res = await fetch(`${API_BASE}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();

            if (data.success) {
                this.setSession(data.token, data.user);
                this.closeModal();
                cart.showNotification('Account created successfully!');
                document.getElementById('registerForm').reset();
            } else {
                cart.showNotification(data.message || 'Registration failed', 'error');
            }
        } catch (err) {
            console.error(err);
            cart.showNotification('Network error occurred. Is backend running?', 'error');
        }
    },

    setSession(token, user) {
        this.token = token;
        this.user = user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.updateHeaderUI();
    },

    logout(e) {
        if (e) e.preventDefault();
        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.updateHeaderUI();
        cart.showNotification('Signed out successfully');
    },

    updateHeaderUI() {
        const accountBtn = document.getElementById('accountBtn');
        if (!accountBtn) return;

        if (this.user) {
            accountBtn.innerHTML = `
                <span class="nav-small-text">Hello, ${this.user.name.split(' ')[0]}</span>
                <span class="nav-bold-text">Account & Lists</span>
            `;
            // Change click to logout for now (or open a dropdown in future)
            accountBtn.onclick = (e) => {
                e.preventDefault();
                if (confirm('Are you sure you want to sign out?')) {
                    this.logout();
                }
            };
        } else {
            accountBtn.innerHTML = `
                <span class="nav-small-text">Hello, sign in</span>
                <span class="nav-bold-text">Account & Lists</span>
            `;
            accountBtn.onclick = (e) => {
                e.preventDefault();
                this.openModal();
            };
        }
    },

    attachEventListeners() {
        // Modal external click close
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('authModal');
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    auth.init();
});
