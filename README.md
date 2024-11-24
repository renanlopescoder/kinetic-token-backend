# Fungible Token Watchlist - Backend

This repository contains the backend service for **Kinetic Token Watchlist**, built using **NestJS** and **TypeScript**. It provides APIs for user authentication, token management, and personalized watchlists.

## Features

- **User Authentication**:
  - Registration and login with JWT-based sessions.
- **Watchlist Management**:
  - Add, remove, and retrieve tokens in the user's watchlist.
- **Secure and Scalable Architecture**:
  - Built with **NestJS** for maintainability and scalability.
- **Database Integration**:
  - Persistent storage with **Postgres** and **CockroachDB** for scalability.

## Technologies Used

- **NestJS**: Backend framework for scalable and maintainable applications.
- **TypeScript**: For type-safe development.
- **TypeORM**: Object-relational mapping for database operations.
- **CockroachDB**: For distributed and reliable database storage.
- **JWT**: For secure authentication.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (>= 18.x)
- **yarn**
- **CockroachDB** (or any compatible PostgreSQL database)

### Project setup

1. Clone the repository:
   ```bash
   git clone https://github.com/renanlopescoder/kinetic-token-backend.git
   cd kinetic-token-backend
  ```

2. Install 

```bash
  yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
# Nest CLI Commands and Project Guide

## Common Nest CLI Commands

The Nest CLI provides helpful commands for generating project structure and scaffolding components. Here are some basic commands to speed up your development:

### Generate a New Module

To create a new module (e.g., user module):

```bash
nest g module user
```

### Generate a New Controller

To create a controller inside a specific module:

```bash
nest g controller user
```

This generates a `user.controller.ts` file where you can define routes (e.g., `/user/register`, `/user/login`).

### Generate a New Service

To create a service for business logic:

```bash
nest g service user
```

This generates a `user.service.ts` file where you can define the service methods (e.g., user registration, authentication).

### Generate All Together

To scaffold a module, controller, and service all at once:

```bash
nest g resource user
```

Follow the prompts to choose the HTTP type (e.g., REST API) and whether to include a CRUD scaffold.

## Database Migrations with TypeORM

### Generate a New Migration

```bash
yarn typeorm migration:generate src/migrations/
```

### Run Migrations

```bash
yarn typeorm migration:run
```

### Revert the Last Migration

```bash
yarn typeorm migration:revert
```

## API Endpoints

### User Authentication

- `POST /user/register`: Register a new user
- `POST /user/login`: Authenticate and log in a user

### Watchlist Management

- `GET /watchlist/:userId`: Retrieve the user's watchlist
- `POST /watchlist/:userId`: Add a token to the watchlist
- `DELETE /watchlist/:userId/:tokenId`: Remove a token from the watchlist

## Deployment

### Deploy with Node.js

1. Build the project:
```bash
yarn run build
```

2. Start the production server:
```bash
yarn run start:prod
```
