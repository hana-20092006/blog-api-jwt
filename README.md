# 📝 Blog API with JWT & Refresh Token Authentication

A production-ready RESTful Blog API built using **Node.js, Express, MongoDB, and JWT**, implementing secure authentication, refresh token–based session management, and authorization with ownership checks.

This project goes beyond basic login and demonstrates **real-world backend authentication patterns**.

---

## 🚀 Features

### 🔐 Authentication
- User registration
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

### 📝 Blog Posts
- Create a post (authenticated users)
- Get all posts (public)
- Get logged-in user's posts
- Update a post (owner only)
- Delete a post (owner only)

### 🧱 Backend Architecture
- Clean separation of routes, controllers, middleware, and models
- MongoDB relationships using ObjectId references
- Proper HTTP status codes (401, 403, 404, 500)
- Environment-based configuration

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JSON Web Tokens (JWT)**
- **bcrypt**
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
│   └── auth.middleware.js
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
git clone https://github.com/<your-username>/blog-api-jwt.git
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

### 🔑 Login

```http
POST /auth/login
```

Returns:

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

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and get tokens |
| POST | `/auth/refresh` | Get new access token |
| POST | `/auth/logout` | Logout user |

### 📝 Posts

| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/posts` | Public |
| POST | `/posts` | Authenticated |
| GET | `/posts/my-posts` | Authenticated |
| PUT | `/posts/:id` | Owner only |
| DELETE | `/posts/:id` | Owner only |

---

## 🧪 Testing the API

Use **Postman** for testing.

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
* Debugging MongoDB indexes and Express routing issues
* Structuring scalable backend applications

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

## 👤 Author

**Hana Maria Philip**
---

## ⭐ Show your support

Give a ⭐️ if this project helped you!