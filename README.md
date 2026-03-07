# 📝 Blog API with JWT Authentication, Input Validation & Centralized Error Handling

A production-ready RESTful Blog API built using **Node.js, Express, MongoDB, and JWT**, implementing secure authentication, refresh token–based session management, authorization with ownership checks, **comprehensive input validation**, and **professional error handling**.

This project goes beyond basic login and demonstrates **real-world backend patterns** with **robust error handling, data validation, and consistent API responses**.

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

### ✅ Input Validation
- **express-validator** integration
- Email format validation
- Password strength requirements (minimum length, must contain numbers)
- Required field validation
- Custom error messages for better user experience
- Pre-processing validation before database operations

### 🚨 Centralized Error Handling (NEW!)
- **Custom `AppError` class** for operational errors
- **Global error handler middleware** - one place for all error logic
- **Automatic error transformations:**
  - MongoDB duplicate key errors → User-friendly messages
  - Mongoose validation errors → Clear field-specific messages
  - Invalid ObjectId → Readable error messages
  - JWT errors → "Please log in again" messages
- **Development vs Production modes:**
  - Development: Detailed error info with stack traces
  - Production: Clean, secure error messages
- **Proper HTTP status codes** (400, 401, 403, 404, 409, 500)
- **Consistent error response format** across all endpoints

### 📝 Blog Posts
- Create a post (authenticated users)
- Get all posts (public)
- Get logged-in user's posts
- Update a post (owner only)
- Delete a post (owner only)

### 🧱 Backend Architecture
- Clean separation of routes, controllers, middleware, and models
- MongoDB relationships using ObjectId references
- MVC architecture pattern
- Environment-based configuration
- Reusable validation and error handling middleware

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JSON Web Tokens (JWT)**
- **bcrypt**
- **express-validator**
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
│   ├── validators.js
│   └── errorHandler.js        ⭐ NEW
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
│   ├── token.js
│   └── AppError.js            ⭐ NEW
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
NODE_ENV=development
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

**Response (Success - 201):**
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

**Response (Validation Error - 400):**
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

**Response (Duplicate Email - 409):**
```json
{
  "status": "fail",
  "message": "email 'john@example.com' already exists. Please use another value."
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

**Response (Success - 200):**
```json
{
  "message": "Login successful",
  "accessToken": "...",
  "refreshToken": "..."
}
```

**Response (Invalid Credentials - 401):**
```json
{
  "status": "fail",
  "message": "Invalid email or password"
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

## 🚨 Error Handling

### Error Response Format

All errors follow a consistent format for better client-side handling:

**Operational Errors (4xx - Client Errors):**
```json
{
  "status": "fail",
  "message": "User-friendly error message explaining what went wrong"
}
```

**Server Errors (5xx - Server Errors):**
```json
{
  "status": "error",
  "message": "Something went wrong!"
}
```

**Development Mode (Detailed Errors):**
```json
{
  "status": "fail",
  "error": { /* full error object */ },
  "message": "User-friendly message",
  "stack": "Error stack trace for debugging"
}
```

### Error Types & Status Codes

| Status Code | Error Type | Example |
|-------------|------------|---------|
| **400** | Bad Request | Invalid email format, password too short, invalid ObjectId |
| **401** | Unauthorized | Wrong password, no token, invalid/expired JWT |
| **403** | Forbidden | Trying to delete someone else's post |
| **404** | Not Found | Post doesn't exist, route doesn't exist |
| **409** | Conflict | Email already registered |
| **500** | Server Error | Database connection failed, unexpected bugs |

### Automatic Error Transformations

The API automatically transforms technical errors into user-friendly messages:

**MongoDB Duplicate Key Error:**
```json
// Raw MongoDB Error: E11000 duplicate key error...
// Transformed to:
{
  "status": "fail",
  "message": "email 'john@example.com' already exists. Please use another value."
}
```

**Mongoose Validation Error:**
```json
// Raw: ValidationError: name: Path `name` is required...
// Transformed to:
{
  "status": "fail",
  "message": "Invalid input data. Name must be at least 2 characters. Please provide a valid email"
}
```

**Invalid MongoDB ObjectId:**
```json
// Raw: CastError: Cast to ObjectId failed for value "123"
// Transformed to:
{
  "status": "fail",
  "message": "Invalid _id: 123"
}
```

**JWT Errors:**
```json
// Invalid token:
{
  "status": "fail",
  "message": "Invalid token. Please log in again!"
}

// Expired token:
{
  "status": "fail",
  "message": "Your token has expired! Please log in again."
}
```

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

### Testing Error Scenarios

**❌ Duplicate Email (409):**
```json
POST /auth/register
{
  "name": "John",
  "email": "existing@test.com",
  "password": "pass123"
}

Response:
{
  "status": "fail",
  "message": "email 'existing@test.com' already exists. Please use another value."
}
```

**❌ Invalid Credentials (401):**
```json
POST /auth/login
{
  "email": "john@test.com",
  "password": "wrongpassword"
}

Response:
{
  "status": "fail",
  "message": "Invalid email or password"
}
```

**❌ No Authentication Token (401):**
```http
POST /posts
{
  "title": "My Post",
  "content": "Content"
}

Response:
{
  "status": "fail",
  "message": "No token provided. Please log in."
}
```

**❌ Invalid JWT Token (401):**
```http
GET /posts/my-posts
Authorization: Bearer faketoken123

Response:
{
  "status": "fail",
  "message": "Invalid token. Please log in again!"
}
```

**❌ Post Not Found (404):**
```http
DELETE /posts/507f1f77bcf86cd799439011
Authorization: Bearer <valid_token>

Response:
{
  "status": "fail",
  "message": "Post not found"
}
```

**❌ Not Authorized (403):**
```http
DELETE /posts/<someone_elses_post_id>
Authorization: Bearer <your_token>

Response:
{
  "status": "fail",
  "message": "Not allowed"
}
```

**❌ Invalid Route (404):**
```http
GET /invalid/endpoint

Response:
{
  "status": "fail",
  "message": "Can't find /invalid/endpoint on this server!"
}
```

### Testing Valid Requests

**✅ Valid Registration:**
```json
POST /auth/register
{
  "name": "John Doe",
  "email": "john@test.com",
  "password": "password123"
}

Response (201):
{
  "message": "User registered successfully",
  "user": { ... }
}
```

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
* **Input validation with express-validator**
* **Creating reusable validation middleware**
* **Centralized error handling architecture** ⭐ NEW
* **Custom error classes in JavaScript** ⭐ NEW
* **Transforming technical errors into user-friendly messages** ⭐ NEW
* **Operational vs programming errors** ⭐ NEW
* **HTTP status codes and when to use each** ⭐ NEW
* **Development vs production error responses** ⭐ NEW
* **MongoDB-specific error handling** ⭐ NEW
* **JWT error handling** ⭐ NEW
* Debugging MongoDB indexes and Express routing issues
* Structuring scalable backend applications
* MVC architecture pattern

---

## 🔜 Future Enhancements

- [x] Centralized error handling middleware ✅
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

---

## 📚 Learning Journey

This project is part of my **Week 1-4** learning from a structured 3-month backend development roadmap:
- ✅ Week 1: JWT Authentication & Security
- ✅ Week 2 (Day 1-4): Input Validation & Centralized Error Handling
- ⏳ Week 2 (Day 5-6): Async Error Handling (In Progress)

---

## ⭐ Show your support

Give a ⭐️ if this project helped you learn!

---

## 📝 License

This project is open source and available under the MIT License.