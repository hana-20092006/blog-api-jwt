# 📝 Blog API with JWT Authentication & Input Validation

A production-ready RESTful Blog API built using **Node.js, Express, MongoDB, and JWT**, implementing secure authentication, refresh token–based session management, authorization with ownership checks, and **comprehensive input validation**.

This project goes beyond basic login and demonstrates **real-world backend authentication patterns** with **robust error handling and data validation**.

---

## 🚀 Features

### 🔐 Authentication
- User registration with validated inputs
- Secure password hashing with **bcrypt**
- User login with JWT
- **Short-lived access tokens**
- **Long-lived refresh tokens**
- Refresh token endpoint to issue new access tokens
- Logout endpoint with refresh token revocation

### 🛡️ Authorization
- Protected routes using JWT middleware
- Ownership-based access control
- Only post owners can update or delete their posts

### ✅ Input Validation (NEW!)
- **express-validator** integration
- Email format validation
- Password strength requirements (minimum length, must contain numbers)
- Required field validation
- Custom error messages for better user experience
- Pre-processing validation before database operations

### 📝 Blog Posts
- Create a post (authenticated users)
- Get all posts (public)
- Get logged-in user's posts
- Update a post (owner only)
- Delete a post (owner only)

### 🧱 Backend Architecture
- Clean separation of routes, controllers, middleware, and models
- MongoDB relationships using ObjectId references
- Proper HTTP status codes (400, 401, 403, 404, 500)
- Environment-based configuration
- Reusable validation middleware

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JSON Web Tokens (JWT)**
- **bcrypt**
- **express-validator** ⭐ NEW
- **dotenv**
- **Postman** (API testing)

---

## 📂 Project Structure
```
src/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── auth.controller.js
│   └── post.controller.js
│
├── middleware/
│   ├── auth.middleware.js
│   └── validators.js          ⭐ NEW
│
├── models/
│   ├── User.js
│   └── Post.js
│
├── routes/
│   ├── auth.routes.js
│   └── post.routes.js
│
├── utils/
│   └── token.js
│
├── app.js
└── server.js
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/hana-20092006/blog-api-jwt.git
cd blog-api-jwt
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Create a `.env` file
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
```

### 4️⃣ Run the server
```bash
npm run dev
```

Server runs at:
```
http://localhost:5000
```

---

## 🔐 Authentication Flow

### 🔑 Register
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validations:**
- Name: Required, minimum 2 characters
- Email: Valid email format required
- Password: Minimum 6 characters, must contain at least one number

**Response (Success):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Response (Validation Error):**
```json
{
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

### 🔑 Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Validations:**
- Email: Valid email format required
- Password: Required

**Response:**
```json
{
  "accessToken": "...",
  "refreshToken": "..."
}
```

### ♻️ Refresh Access Token
```http
POST /auth/refresh
```

Body:
```json
{
  "refreshToken": "<refresh_token>"
}
```

Returns a new access token.

### 🚪 Logout
```http
POST /auth/logout
```

Revokes the refresh token.

---

## 🔌 API Endpoints

### 🔐 Auth

| Method | Endpoint | Description | Validation |
|--------|----------|-------------|------------|
| POST | `/auth/register` | Register a new user | ✅ Name, Email, Password |
| POST | `/auth/login` | Login and get tokens | ✅ Email, Password |
| POST | `/auth/refresh` | Get new access token | ❌ |
| POST | `/auth/logout` | Logout user | ❌ |

### 📝 Posts

| Method | Endpoint | Access | Validation |
|--------|----------|--------|------------|
| GET | `/posts` | Public | ❌ |
| POST | `/posts` | Authenticated | ✅ Title, Content |
| GET | `/posts/my-posts` | Authenticated | ❌ |
| PUT | `/posts/:id` | Owner only | ✅ Title, Content |
| DELETE | `/posts/:id` | Owner only | ❌ |

---

## ✅ Validation Rules

### User Registration
- **Name:** 
  - Required
  - Minimum 2 characters
  - Trimmed of whitespace

- **Email:** 
  - Required
  - Must be valid email format
  - Normalized (lowercase)
  - Trimmed of whitespace

- **Password:** 
  - Required
  - Minimum 6 characters
  - Must contain at least one number
  - Trimmed of whitespace

### User Login
- **Email:** Valid email format required
- **Password:** Required (not empty)

### Post Creation/Update
- **Title:** 
  - Required
  - 5-100 characters
  - Trimmed of whitespace

- **Content:** 
  - Required
  - Minimum 10 characters
  - Trimmed of whitespace

---

## 🧪 Testing the API

Use **Postman** for testing.

### Testing Validation

**❌ Test Invalid Email:**
```json
POST /auth/register
{
  "name": "John",
  "email": "invalid-email",
  "password": "pass123"
}
```

Expected: 400 Bad Request with validation error

**❌ Test Short Password:**
```json
{
  "name": "John",
  "email": "john@test.com",
  "password": "123"
}
```

Expected: 400 Bad Request with password validation errors

**✅ Test Valid Registration:**
```json
{
  "name": "John Doe",
  "email": "john@test.com",
  "password": "password123"
}
```

Expected: 201 Created with user data

### Testing Protected Routes

For protected routes, include this header:
```
Authorization: Bearer <access_token>
```

---

## 🧠 What I Learned

* Implementing JWT authentication from scratch
* Difference between authentication and authorization
* Access tokens vs refresh tokens
* Secure session handling with refresh token rotation logic
* MongoDB schema design and ObjectId relationships
* Ownership-based authorization
* **Input validation with express-validator** ⭐ NEW
* **Creating reusable validation middleware** ⭐ NEW
* **Proper error handling for invalid inputs** ⭐ NEW
* Debugging MongoDB indexes and Express routing issues
* Structuring scalable backend applications

---

## 🔜 Future Enhancements

- [ ] Centralized error handling middleware
- [ ] Async error wrapper to reduce try-catch blocks
- [ ] Rate limiting for API endpoints
- [ ] Email verification for new users
- [ ] Password reset functionality
- [ ] Post comments feature
- [ ] User profile management
- [ ] Pagination for posts
- [ ] File upload for profile pictures
- [ ] API documentation with Swagger

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

## 👤 Author

**Hana Maria Philip**  
Second Year CSE Student | Learning Backend Development

Connect with me:
- GitHub: [@hana-20092006](https://github.com/hana-20092006)
- LinkedIn: [Your LinkedIn] (optional)

---

## 📚 Learning Journey

This project is part of my **Week 1-2** learning from a structured 3-month backend development roadmap, focusing on:
- Week 1: JWT Authentication & Security
- Week 2: Input Validation & Error Handling (In Progress)

---

## ⭐ Show your support

Give a ⭐️ if this project helped you learn!

---

## 📝 License

This project is open source and available under the MIT License.