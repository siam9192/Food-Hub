##  FoodHub – Realtime Food Ordering System

FoodHub is a modern, full-stack web application designed to deliver a seamless and real-time food ordering experience. It connects customers with restaurants, allowing users to browse menus, place orders, and track deliveries efficiently—all in one place.

Built with scalability and performance in mind, FoodHub provides a smooth user experience through an intuitive interface and a powerful backend system.

### 🚀 Key Highlights
- 🔐 Secure authentication and authorization
- 🛒 Easy food browsing and ordering system
- ⚡ Real-time order updates and tracking
- 🏪 Restaurant and menu management
- 📊 Admin dashboard for managing users, orders, and inventory

##  Tech Stack Used

## Used Technologies

| Category           | Technologies |
|-------------------|--------------|
| Frontend          | Next Js, TypeScript, Tailwind CSS, , Socket.IO Client |
| Backend           | Node.js, Express.js, TypeScript, Prisma ORM, PostgreSQL, Socket.IO |
| Authentication    | JWT Tokens  |
| Validation        | Zod |
| Testing           | Jest |
| Deployment | Render & Vercel |





## Setup Instructions

### Clone the Repository
```bash

git clone https://github.com/siam9192/Food-Hub

```
### Backend

####  Setup Environment Variables

 Create a `.env` file in the root of the backend directory by copying from `env.example` and update it with your own values:

```bash
cp env.example .env
```
```bash
cd project-name/backend

# Install dependencies
npm install


# Init DB
npx prisma migrate dev


# Start the backend server
npm run dev
```

### Frontend
```bash
cd ../frontend
npm install
npm run dev 
```

#### Setup Environment Variables

 Create a `.env` file in the root of the backend directory by copying from `env.example` and update it with your own values:

```bash
cp env.example .env
```


## Live Links & Demo Login

###  Demo Login Credentials

Use the following credentials to explore different roles in the system:

#### 👑 Admin
- **Email:** `ahsiam999@gmail.com`
- **Password:** `admin123`

#### 🧑‍🍳 Provider
- **Email:** `contact@dhakadiner@gmail.com`
- **Password:** `password123`

#### 👤 User
- **Email:** `siamhasan5161@gmail.com`
- **Password:** `12345678`


### Live Applications
- **Frontend:** https://posbuzz-client.vercel.app
- **Backend:** https://posbuzz-tau.vercel.app
