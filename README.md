# Inventory Application 📦

A full-stack inventory management app that lets you create, read, update, and delete products and categories. Built with Express and PostgreSQL, with a clean server-rendered UI.

---

## Features

- Full **CRUD** operations for both products and categories
- Relational data model: each product belongs to a category
- Form validation on both client and server side
- Clean and responsive UI with custom CSS
- Environment-based configuration via `.env`

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Template Engine:** EJS
- **Architecture:** MVC (Model-View-Controller)

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL

### Installation

```bash
# Clone the repository
git clone https://github.com/Cesare-V/Inventory-Application.git
cd Inventory-Application

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your DATABASE_URL in .env

# Run the app
node app.js
```

The app will be available at `http://localhost:3000`.

## Project Structure

```
├── controllers/   # Route logic and business logic
├── db/            # Database queries and connection
├── routes/        # Express route definitions
├── views/         # EJS templates
├── public/css/    # Stylesheets
└── app.js         # App entry point
```
