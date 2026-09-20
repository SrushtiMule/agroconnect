-- ==========================================================
-- AGROCONNECT ENTERPRISE DATABASE SCHEMA (MySQL 8.0+)
-- ==========================================================

CREATE DATABASE IF NOT EXISTS agroconnect_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE agroconnect_db;

-- 1. USERS & AUTHENTICATION TABLE
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'FARMER', 'BUYER', 'DELIVERY_PARTNER') NOT NULL DEFAULT 'BUYER',
    avatar_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_role (role),
    INDEX idx_user_email (email)
);

-- 2. FARMERS PROFILE TABLE
CREATE TABLE IF NOT EXISTS farmers (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL UNIQUE,
    farm_name VARCHAR(150) NOT NULL,
    farm_size_acres DECIMAL(6, 2) NOT NULL,
    experience_years INT NOT NULL DEFAULT 1,
    farming_type ENUM('ORGANIC', 'NATURAL', 'CONVENTIONAL', 'MIXED') NOT NULL DEFAULT 'ORGANIC',
    bio TEXT,
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    village VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    aadhaar_masked VARCHAR(20),
    farmer_id_card VARCHAR(100),
    bank_name VARCHAR(100),
    account_number VARCHAR(50),
    ifsc_code VARCHAR(20),
    upi_id VARCHAR(100),
    is_verified BOOLEAN DEFAULT FALSE,
    verification_status ENUM('PENDING', 'VERIFIED', 'REJECTED', 'NEEDS_INFO') DEFAULT 'PENDING',
    rating_avg DECIMAL(3, 2) DEFAULT 4.80,
    total_reviews INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_farmer_location (state, district),
    INDEX idx_farmer_status (verification_status)
);

-- 3. BUYERS PROFILE TABLE
CREATE TABLE IF NOT EXISTS buyers (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL UNIQUE,
    buyer_type ENUM('RETAIL_CONSUMER', 'RESTAURANT', 'WHOLESALER', 'GROCERY_RETAILER', 'EXPORTER') NOT NULL DEFAULT 'RETAIL_CONSUMER',
    business_name VARCHAR(150),
    gst_number VARCHAR(30),
    pan_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR(500),
    item_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(36) PRIMARY KEY,
    farmer_id VARCHAR(36) NOT NULL,
    category_id VARCHAR(36) NOT NULL,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(180) NOT NULL,
    description TEXT NOT NULL,
    price_per_unit DECIMAL(10, 2) NOT NULL,
    unit ENUM('KG', 'QUINTAL', 'TON', 'PIECE', 'BOX', 'CRATE') NOT NULL DEFAULT 'KG',
    available_quantity DECIMAL(10, 2) NOT NULL,
    min_order_quantity DECIMAL(10, 2) NOT NULL DEFAULT 1.00,
    quality_grade ENUM('A_PLUS', 'A', 'B', 'C') NOT NULL DEFAULT 'A',
    farming_type ENUM('ORGANIC', 'NATURAL', 'CONVENTIONAL') NOT NULL DEFAULT 'ORGANIC',
    is_organic BOOLEAN DEFAULT TRUE,
    harvest_date DATE NOT NULL,
    shelf_life_days INT DEFAULT 7,
    origin_state VARCHAR(100) NOT NULL,
    origin_district VARCHAR(100) NOT NULL,
    delivery_options JSON, -- e.g. ["PICKUP", "FARMER_DELIVERY", "AGROEXPRESS"]
    is_approved BOOLEAN DEFAULT TRUE,
    in_stock BOOLEAN DEFAULT TRUE,
    rating_avg DECIMAL(3, 2) DEFAULT 4.90,
    total_sales INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (farmer_id) REFERENCES farmers(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
    INDEX idx_prod_cat (category_id),
    INDEX idx_prod_farmer (farmer_id),
    INDEX idx_prod_price (price_per_unit),
    INDEX idx_prod_approved (is_approved, in_stock)
);

-- 6. PRODUCT IMAGES TABLE
CREATE TABLE IF NOT EXISTS product_images (
    id VARCHAR(36) PRIMARY KEY,
    product_id VARCHAR(36) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 7. ADDRESSES TABLE
CREATE TABLE IF NOT EXISTS addresses (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    street_address TEXT NOT NULL,
    landmark VARCHAR(150),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 8. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(36) PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    buyer_id VARCHAR(36) NOT NULL,
    farmer_id VARCHAR(36) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    delivery_fee DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    discount_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('PENDING', 'CONFIRMED', 'PACKED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    payment_status ENUM('PENDING', 'ESCROW_HELD', 'RELEASED_TO_FARMER', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    delivery_address_id VARCHAR(36) NOT NULL,
    delivery_type ENUM('STANDARD_FREIGHT', 'AGROEXPRESS_24H', 'FARMER_DELIVERY', 'MANDI_PICKUP') DEFAULT 'AGROEXPRESS_24H',
    estimated_delivery DATE,
    actual_delivery TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES users(id),
    FOREIGN KEY (farmer_id) REFERENCES farmers(id),
    FOREIGN KEY (delivery_address_id) REFERENCES addresses(id),
    INDEX idx_order_buyer (buyer_id),
    INDEX idx_order_farmer (farmer_id),
    INDEX idx_order_status (status)
);

-- 9. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS order_items (
    id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 10. PAYMENTS & ESCROW TABLE
CREATE TABLE IF NOT EXISTS payments (
    id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL,
    transaction_id VARCHAR(100) UNIQUE NOT NULL,
    payment_method ENUM('UPI', 'CREDIT_DEBIT_CARD', 'NET_BANKING', 'CASH_ON_DELIVERY') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    status ENUM('INITIATED', 'SUCCESS', 'FAILED', 'ESCROW_HELD', 'SETTLED_TO_FARMER') DEFAULT 'SUCCESS',
    paid_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- 11. DELIVERIES & LIVE TRACKING TABLE
CREATE TABLE IF NOT EXISTS deliveries (
    id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL UNIQUE,
    driver_name VARCHAR(100),
    driver_phone VARCHAR(20),
    vehicle_number VARCHAR(50),
    current_lat DECIMAL(10, 8),
    current_lng DECIMAL(11, 8),
    origin_lat DECIMAL(10, 8),
    origin_lng DECIMAL(11, 8),
    dest_lat DECIMAL(10, 8),
    dest_lng DECIMAL(11, 8),
    tracking_notes TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- 12. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS reviews (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36),
    farmer_id VARCHAR(36),
    order_id VARCHAR(36),
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_verified_buyer BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (farmer_id) REFERENCES farmers(id) ON DELETE CASCADE
);

-- 13. CART & WISHLIST TABLES
CREATE TABLE IF NOT EXISTS cart (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_cart (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS wishlist (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_wishlist (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 14. MESSAGES / REAL-TIME CHAT TABLE
CREATE TABLE IF NOT EXISTS messages (
    id VARCHAR(36) PRIMARY KEY,
    sender_id VARCHAR(36) NOT NULL,
    receiver_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36),
    order_id VARCHAR(36),
    message_text TEXT NOT NULL,
    offer_price DECIMAL(10, 2),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 15. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('ORDER', 'VERIFICATION', 'PAYMENT', 'PRICE_ALERT', 'GENERAL') DEFAULT 'GENERAL',
    link_url VARCHAR(255),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 16. FARMER VERIFICATION DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS farmer_documents (
    id VARCHAR(36) PRIMARY KEY,
    farmer_id VARCHAR(36) NOT NULL,
    doc_type ENUM('AADHAAR', 'FARMER_7_12', 'ORGANIC_CERTIFICATE', 'BANK_PASSBOOK', 'SOIL_TEST') NOT NULL,
    document_url VARCHAR(500) NOT NULL,
    file_name VARCHAR(150) NOT NULL,
    verification_status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP NULL,
    admin_notes TEXT,
    FOREIGN KEY (farmer_id) REFERENCES farmers(id) ON DELETE CASCADE
);

-- 17. TODAY'S APMC MANDI MARKET PRICES TABLE
CREATE TABLE IF NOT EXISTS market_prices (
    id VARCHAR(36) PRIMARY KEY,
    crop_name VARCHAR(100) NOT NULL,
    market_name VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    min_price DECIMAL(10, 2) NOT NULL,
    max_price DECIMAL(10, 2) NOT NULL,
    modal_price DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(20) DEFAULT 'Quintal',
    price_change_pct DECIMAL(4, 2) DEFAULT 0.00,
    updated_date DATE NOT NULL,
    INDEX idx_mandi_crop (crop_name, state)
);

-- 18. COMPLAINTS & DISPUTES TABLE
CREATE TABLE IF NOT EXISTS complaints (
    id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    subject VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('OPEN', 'IN_INVESTIGATION', 'RESOLVED', 'CLOSED') DEFAULT 'OPEN',
    resolution_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
