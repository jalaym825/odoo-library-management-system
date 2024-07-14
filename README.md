# Library Management System

A comprehensive Library Management System built to manage user roles, book inventory, borrowing processes, and reporting. This project leverages PostgreSQL, Node.js, React, and TailwindCSS to deliver a seamless experience for admins, librarians, and users.

## Features

### User Management
- *Login/Logout functionality* for Admin and Users.
- *Role-based access control*: Different roles for Admin, Librarian, and User.

### Book Inventory Management
- *Add, update, delete, and search* for books.
- *Book details*: ISBN, title, author, publisher, year, genre, quantity.
- *Real-time availability status* for each book.

Note: You can use the Google Books API to fetch data for adding new books by entering the ISBN number to fetch book details.
Example API call: https://www.googleapis.com/books/v1/volumes?q=isbn:9781787123427

### Borrowing System
- *Checkout process* for borrowing books.
- *Return process* including due dates and late fees calculation.
- *History tracking* for each user's borrowed and returned books.

### Search and Recommendations
- *Advanced search options* (by title, author, genre, etc.).
- *Book recommendations* based on user history or popular trends.

### Notifications and Alerts
- *Email or SMS notifications* for due dates, new arrivals, etc.
- *Alerts for overdue books* and outstanding fees.

### Reporting
- *Generate reports* on book usage, overdue items, user activity, etc.
- *Dashboard for admins and librarians* to see real-time statistics.

## Technology Stack
- *Database*: PostgreSQL
- *Backend*: Node.js
- *Frontend*: React
- *Styling*: TailwindCSS

## Installation

### Prerequisites
- Node.js and npm installed
- PostgreSQL installed and running
- Google Books API Key

### Steps
1. *Clone the repository:*
    bash
    git clone https://github.com/yourusername/library-management-system.git
    cd library-management-system
    

2. *Install backend dependencies:*
    bash
    cd backend
    npm install
    

3. *Set up environment variables:*
    Create a .env file in the backend directory and add your database configuration and Google Books API key.
    env
    DATABASE_URL=your_postgresql_database_url
    GOOGLE_BOOKS_API_KEY=your_google_books_api_key
    

4. *Run database migrations:*
    bash
    npm run migrate
    

5. *Start the backend server:*
    bash
    npm start
    

6. *Install frontend dependencies:*
    bash
    cd ../frontend
    npm install
    

7. *Start the frontend development server:*
    bash
    npm start
    

8. *Access the application:*
    Open your browser and navigate to http://localhost:3000

## Usage

- *Admin*: Manage users, view reports, and monitor library statistics.
- *Librarian*: Manage book inventory, handle borrowing and return processes.
- *User*: Browse books, borrow and return books, receive notifications.

## Contributing

We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature-name).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/your-feature-name).
5. Open a pull request.