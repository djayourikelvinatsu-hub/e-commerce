// API Configuration
const API_URL = 'http://localhost:5000/api';

// Store token
let token = localStorage.getItem('token');

// API helper functions
const api = {
    // Auth endpoints
    auth: {
        register: async (userData) => {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            return response.json();
        },

        login: async (email, password) => {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            return response.json();
        },

        getMe: async () => {
            const response = await fetch(`${API_URL}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.json();
        }
    },

    // Product endpoints
    products: {
        getAll: async (params = '') => {
            const response = await fetch(`${API_URL}/products${params}`);
            return response.json();
        },

        getOne: async (id) => {
            const response = await fetch(`${API_URL}/products/${id}`);
            return response.json();
        },

        getFeatured: async () => {
            const response = await fetch(`${API_URL}/products/featured`);
            return response.json();
        },

        addReview: async (productId, review) => {
            const response = await fetch(`${API_URL}/products/${productId}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(review)
            });
            return response.json();
        }
    },

    // Order endpoints
    orders: {
        create: async (orderData) => {
            const response = await fetch(`${API_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            });
            return response.json();
        },

        getMyOrders: async () => {
            const response = await fetch(`${API_URL}/orders/myorders`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.json();
        },

        getOne: async (id) => {
            const response = await fetch(`${API_URL}/orders/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.json();
        }
    },

    // User endpoints
    users: {
        getProfile: async () => {
            const response = await fetch(`${API_URL}/users/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.json();
        },

        updateProfile: async (userData) => {
            const response = await fetch(`${API_URL}/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });
            return response.json();
        },

        getWishlist: async () => {
            const response = await fetch(`${API_URL}/users/wishlist`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.json();
        },

        addToWishlist: async (productId) => {
            const response = await fetch(`${API_URL}/users/wishlist/${productId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.json();
        },

        removeFromWishlist: async (productId) => {
            const response = await fetch(`${API_URL}/users/wishlist/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.json();
        }
    }
};

// Update loadFeaturedProducts to use API
async function loadFeaturedProducts() {
    try {
        const data = await api.products.getFeatured();
        const productsGrid = document.getElementById('featuredProducts');

        if (data.success && productsGrid) {
            productsGrid.innerHTML = data.products.map(product => `
                <div class="product-card">
                    ${product.stock === 0 ? '<span class="product-badge">Out of Stock</span>' : ''}
                    ${product.isOnSale ? '<span class="product-badge sale">Sale</span>' : ''}
                    ${product.isNew ? '<span class="product-badge new">New</span>' : ''}
                    <img src="${product.images[0]?.url || 'https://via.placeholder.com/300x400'}" 
                         alt="${product.name}" class="product-image"
                         onclick="window.location.href='product-detail.html?id=${product._id}'">
                    <div class="product-info">
                        <h3 class="product-title" onclick="window.location.href='product-detail.html?id=${product._id}'">
                            ${product.name}
                        </h3>
                        <div class="product-price">
                            $${product.price.toFixed(2)}
                            ${product.oldPrice ? `<del>$${product.oldPrice.toFixed(2)}</del>` : ''}
                        </div>
                        <button class="btn btn-primary btn-add-to-cart" 
                                onclick="addToCart('${product._id}')"
                                ${product.stock === 0 ? 'disabled' : ''}>
                            ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading featured products:', error);
    }
}

// Update login function
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const data = await api.auth.login(email, password);

        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            token = data.token;

            document.querySelector('.auth-modal').remove();
            showNotification('Login successful!');
            updateUserUI(data.user);
        } else {
            showNotification(data.message || 'Login failed', 'error');
        }
    } catch (error) {
        showNotification('Server error', 'error');
    }
}

// Update register function
async function handleRegister(e) {
    e.preventDefault();

    const userData = {
        name: document.getElementById('regName').value,
        email: document.getElementById('regEmail').value,
        password: document.getElementById('regPassword').value
    };

    const confirm = document.getElementById('regConfirmPassword').value;

    if (userData.password !== confirm) {
        showNotification('Passwords do not match', 'error');
        return;
    }

    try {
        const data = await api.auth.register(userData);

        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            token = data.token;

            document.querySelector('.auth-modal').remove();
            showNotification('Registration successful!');
            updateUserUI(data.user);
        } else {
            showNotification(data.message || 'Registration failed', 'error');
        }
    } catch (error) {
        showNotification('Server error', 'error');
    }
}

// Update wishlist functions
async function addToWishlist(productId) {
    if (!token) {
        showNotification('Please login to add items to wishlist', 'error');
        showAuthModal();
        return;
    }

    try {
        const data = await api.users.addToWishlist(productId);

        if (data.success) {
            showNotification('Added to wishlist');
        } else {
            showNotification(data.message || 'Failed to add to wishlist', 'error');
        }
    } catch (error) {
        showNotification('Server error', 'error');
    }
}

// Initialize with token
document.addEventListener('DOMContentLoaded', async () => {
    // Load categories from API
    await loadCategories();

    // Load featured products
    await loadFeaturedProducts();

    // Check if user is logged in
    if (token) {
        try {
            const data = await api.auth.getMe();
            if (data.success) {
                updateUserUI(data.user);
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                token = null;
            }
        } catch (error) {
            console.error('Error loading user:', error);
        }
    }

    // Initialize cart
    cart.updateCartCount();

    // Initialize event listeners
    initializeEventListeners();
});