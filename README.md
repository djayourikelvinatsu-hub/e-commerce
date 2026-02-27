# E-Commerce Platform

A full-stack e-commerce platform featuring a Node.js/Express/MongoDB backend API and a responsive Vanilla HTML/CSS/JS frontend.

## Project Structure

- `backend/` - Node.js + Express backend API with MongoDB integration.
- `ecommerce-site/` - Vanilla HTML, CSS, and JavaScript frontend storefront.

## Features

- **Storefront**: Browse products by category, view featured products, search, and view detailed product pages.
- **Authentication**: User registration and login with JWT and bcrypt password hashing.
- **Cart & Wishlist**: Add products to cart, update quantities, and add to wishlist.
- **Checkout**: Stripe payment integration.
- **Admin**: Basic admin capabilities to manage orders and products.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally at `mongodb://localhost:27017` or a cloud instance)

## Setup & Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment Variables:
   Create a `.env` file in the `backend/` directory with the following environment variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/shopease
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRE=7d
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   CLIENT_URL=http://localhost:5500
   NODE_ENV=development
   ```

4. Seed the Database:
   Wait for your MongoDB instance to be running, then populate it with initial mock products and categories:
   ```bash
   node seed.js
   ```

5. Start the Server:
   ```bash
   node server.js
   ```

The backend server should now be running, typically on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ecommerce-site
   ```

2. Start a static file server. You can use standard tools such as `serve` or Python:
   ```bash
   npx serve -p 5500
   ```
   *or*
   ```bash
   python3 -m http.server 5500
   ```

3. Open your browser and navigate to `http://localhost:5500`.

## API Endpoints Overview

- `GET /health` - Check backend health status
- `POST /api/auth/register` - Create a new user
- `POST /api/auth/login` - Authenticate an existing user
- `GET /api/products` - Fetch all products
- `GET /api/products/featured` - Fetch featured store products
- `GET /api/products/:id` - Fetch single product details
- `POST /api/orders` - Submit a new order
