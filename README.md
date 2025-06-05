# Dog Kennel Manager

A simple app for managing dogs and kennels, built with React, Express, and MongoDB.

---

## Features

- View and manage kennels and dogs
- Assign dogs to kennels with drag & drop
- Edit mode with Save and Cancel options
- Backend API with Mongoose models
- Max 2 dogs per kennel limit with UI feedback
- Continuous Integration with GitHub Actions
- Automated frontend deployment to Vercel
- Automated backend deployment to Railway
- Basic testing setup for frontend

---

## Tech Stack

- **Frontend:** React (TypeScript), Tailwind CSS, react-hot-toast
- **Backend:** Node.js, Express, Mongoose (MongoDB)
- **Database:** MongoDB
- **Env management:** dotenv
- **CORS:** Enabled for API

---

## Getting Started

### Prerequisites

- Node.js v14+
- MongoDB instance (cloud)

### Installation & Run

```bash
git clone https://github.com/yourusername/dog-kennel-manager.git
cd dog-kennel-manager/backend
npm install
cd ../frontend
npm install
```

## Frontend .env:

REACT_APP_API_BASE=https://kennel-manager-production.up.railway.app

## Backend .env:

MONGO_URI=mongodb+srv://subly:I9Ti9Srotaffd7vI@cluster0.sjnpm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

PORT=5000
