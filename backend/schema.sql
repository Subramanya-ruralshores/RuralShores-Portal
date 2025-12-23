-- Create Database
-- CREATE DATABASE ruralshores_db;

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'EMPLOYEE', -- 'ADMIN', 'EMPLOYEE'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services Table (to store data previously hardcoded in Services.jsx)
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    image_url TEXT,
    link VARCHAR(255),
    key_benefits TEXT[],
    use_cases TEXT[],
    deliverables TEXT[]
);

-- Employee Profile Table
CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    employee_id VARCHAR(50) UNIQUE,
    designation VARCHAR(100),
    department VARCHAR(100),
    phone VARCHAR(15),
    address TEXT,
    date_of_joining DATE DEFAULT CURRENT_DATE
);

-- AI Projects Table
CREATE TABLE ai_projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50),
    status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample Data
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@ruralshores.com', '$2b$10$YourHashedPasswordHere', 'ADMIN');
