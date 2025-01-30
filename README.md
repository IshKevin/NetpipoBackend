# Netpipo Backend  

## Employee Management API

This project is a RESTful API for managing employees within a company. It supports basic CRUD operations, JWT authentication, and follows Object-Oriented Programming (OOP) principles. The API is built using **Express.js**, **TypeScript**, and **Drizzle ORM** with a **Neon PostgreSQL** database.

---

## Table of Contents

- [Netpipo Backend](#netpipo-backend)
  - [Employee Management API](#employee-management-api)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
    - [Database Setup](#database-setup)
    - [Running the Application](#running-the-application)
  - [API Endpoints](#api-endpoints)
    - [Authentication](#authentication)
    - [Employee Management](#employee-management)
  - [Authentication](#authentication-1)
  - [Error Handling](#error-handling)
  - [Testing](#testing)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)
  - [License](#license)

---

## Features

- **Employee Management**:
  - Create, read, update, and delete employee records.
- **Authentication**:
  - JWT-based authentication for secure access.
  - Restricted access to modification endpoints (POST, PUT, DELETE).
- **Database**:
  - Uses **Neon PostgreSQL** for data storage.
  - Proper schema design with **Drizzle ORM**.
- **Error Handling**:
  - Meaningful HTTP status codes and error messages.
- **Testing**:
  - Unit tests for key functionalities using **Jest**.

---

## Technologies Used

- **Backend Framework**: Express.js
- **Programming Language**: TypeScript
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: JSON Web Tokens (JWT)
- **Testing**: Jest
- **Environment Management**: dotenv

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (or Neon PostgreSQL for cloud-based database)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/NetpipoBackend.git
   cd NetpipoBackend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
DATABASE_URL=your_neon_postgres_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

- `DATABASE_URL`: Connection string for your Neon PostgreSQL database.
- `JWT_SECRET`: Secret key for signing JWT tokens.
- `PORT`: Port on which the server will run (default is 3000).

### Database Setup

1. Ensure your Neon PostgreSQL database is running.
2. Use the provided schema in `src/schema/employee.schema.ts` to create the necessary tables.
3. Run the following command to apply migrations (if applicable):
   ```bash
   npm run migrate
   ```

### Running the Application

Start the server:
```bash
npm start
```

The server will start on `http://localhost:3000`.

---

## API Endpoints

### Authentication

- **POST /auth/register**
  - Register a new user.
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```

- **POST /auth/login**
  - Login and receive a JWT token.
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```

### Employee Management

- **POST /employees/**
  - Create a new employee (requires authentication).
  - Request Body:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "position": "Software Engineer",
      "salary": 80000
    }
    ```

- **GET /employees/**
  - List all employees.

- **GET /employees/{id}**
  - Get details of a specific employee.

- **PUT /employees/{id}**
  - Update an employee's details (requires authentication).
  - Request Body:
    ```json
    {
      "name": "Jane Doe",
      "position": "Senior Software Engineer",
      "salary": 90000
    }
    ```

- **DELETE /employees/{id}**
  - Delete an employee (requires authentication).

---

## Authentication

- All modification endpoints (POST, PUT, DELETE) require a valid JWT token.
- Include the token in the `Authorization` header:
  ```
  Authorization: Bearer <token>
  ```

---

## Error Handling

The API returns meaningful HTTP status codes and error messages. Examples:

- **400 Bad Request**: Invalid input data.
- **401 Unauthorized**: Missing or invalid JWT token.
- **404 Not Found**: Employee not found.
- **500 Internal Server Error**: Server-side error.

---

## Testing

Unit tests are written using **Jest**. To run the tests:

```bash
npm test
```

Test coverage includes:
- User registration and login.
- Employee creation, retrieval, and deletion.

---

## Project Structure

```
NetpipoBackend/
├── src/
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Custom middleware (e.g., authentication)
│   ├── schema/               # Database schema
│   ├── config/               # Configuration files
│   ├── tests/                # Unit tests
│   ├── app.ts                # Express application setup
│   └── server.ts             # Server entry point
├── .env                      # Environment variables
├── .gitignore                # Git ignore file
├── jest.config.ts            # Jest configuration
├── package.json              # Project dependencies
├── README.md                 # Project documentation
└── tsconfig.json             # TypeScript configuration
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize this `README.md` further to suit your project's specific needs. Let me know if you need additional assistance!
