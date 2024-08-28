# Simple Login System

A simple login system using Node.js, Express, MySQL, and bcrypt for password hashing, allowing user registration and login.

## Features

- User registration with hashed passwords.
- Secure login functionality.
- Basic HTML interface.

## Prerequisites

- Node.js
- MySQL database

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/simple-login.git
   cd simple-login
   ```

2. **Install dependencies:**
   ```bash
   npm install express bcrypt body-parser mysql
   ```

3. **Set up the MySQL database:**
   Create a database named `simple_login` with a `users` table:
   ```sql
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(255) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL
   );
   ```

4. **Update database connection settings in `index.js`.**

## Usage

1. **Start the server:**
   ```bash
   node index.js
   ```

2. **Access the app:**
   Visit `http://localhost:3000` in your browser.

## API Endpoints

- **GET /**: Login page.
- **POST /register**: Register a new user.
- **POST /login**: Log in a user.

## Notes

- Passwords are hashed with bcrypt for security.
- This is a basic implementation; consider enhancements for production use.

## License

MIT License. See the [LICENSE](LICENSE) file for details.
