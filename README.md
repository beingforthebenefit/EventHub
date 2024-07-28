# EventHub

EventHub is a modern event management and registration platform.

## Table of Contents

- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Application](#running-the-application)
  - [With Docker](#with-docker)
- [Running Tests](#running-tests)
- [Ports](#ports)
- [Environment Variables](#environment-variables)

## Project Structure

+++
.
├── backend
│   ├── src
│   │   ├── resolvers
│   │   ├── prisma
│   │   ├── __tests__
│   ├── package.json
│   ├── Dockerfile
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   ├── package.json
│   ├── Dockerfile
├── docker-compose.yml
└── README.md
+++

## Technologies Used

- **Frontend:**
  - React
  - Material-UI
  - Apollo Client

- **Backend:**
  - Node.js
  - Express
  - Prisma
  - Apollo Server
  - PostgreSQL

- **Testing:**
  - Jest
  - React Testing Library

- **Deployment:**
  - Docker

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your machine.
- Node.js and npm (for local development).

### Installation

Clone the repository:

+++bash
git clone https://github.com/yourusername/eventhub.git
cd eventhub
+++

## Running the Application

### With Docker

Build and start the Docker containers:

+++bash
docker-compose up --build
+++

This command will build the Docker images and start the containers for the frontend, backend, and PostgreSQL database.

Access the application:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:4000/graphql](http://localhost:4000/graphql)

## Running Tests

To run tests for the frontend and backend, use the following commands:

- **Frontend Tests:**
  +++bash
  cd frontend
  npm run test
  +++

- **Backend Tests:**
  +++bash
  cd backend
  npm run test
  +++

## Ports

- **Frontend:** `3000`
- **Backend:** `4000`
- **Database:** `5432`

## Environment Variables

Create a `.env` file in the root of the `backend` directory with the following content:

+++env
DATABASE_URL=postgresql://eventhub_user:password@db:5432/eventhub?schema=public
SECRET=your_jwt_secret
+++

Make sure to replace `your_jwt_secret` with a secure secret for JWT.
