# Project Template

## Overview

This project is a template for creating web applications using React and Material-UI on the frontend, and Apollo Client setup for GraphQL. It includes responsive navigation menus for both desktop and mobile, and a basic dashboard layout. The backend is set up with Node.js, TypeScript, and Apollo Server for GraphQL.

## Features

- **React**: Frontend library for building user interfaces.
- **Material-UI**: UI framework for React with pre-built components.
- **Apollo Client**: State management library for GraphQL.
- **Apollo Server**: GraphQL server for the backend.
- **Responsive Design**: Navigation menu adapts to desktop and mobile screens.
- **Jest**: Testing framework for unit tests.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- Docker installed on your machine (optional, for containerized deployment).

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/beingforthebenefit/project-template.git
    cd project-template
    ```

2. Install dependencies for both frontend and backend:

    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. Start the development servers:

    ```bash
    # In one terminal, start the backend
    cd backend
    npm run dev

    # In another terminal, start the frontend
    cd frontend
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3000` for the frontend and `http://localhost:4000/graphql` for the GraphQL playground.

## Project Structure

```plaintext
project-template/
├── backend
│   ├── Dockerfile
│   ├── jest.config.js
│   ├── jest.setup.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── src
│   │   ├── index.ts
│   │   ├── resolvers
│   │   │   └── MessageResolver.ts
│   │   └── __tests__
│   │       └── MessageResolver.test.ts
│   └── tsconfig.json
├── docker-compose.yml
├── frontend
│   ├── components.json
│   ├── craco.config.js
│   ├── Dockerfile
│   ├── jest.config.js
│   ├── jest.setup.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── README.md
│   ├── src
│   │   ├── apolloClient.ts
│   │   ├── App.css
│   │   ├── App.test.tsx
│   │   ├── App.tsx
│   │   ├── components
│   │   │   ├── Dashboard.test.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Footer.test.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.test.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Message.test.tsx
│   │   │   └── Message.tsx
│   │   ├── index.css
│   │   ├── index.tsx
│   │   ├── logo.svg
│   │   ├── react-app-env.d.ts
│   │   ├── reportWebVitals.ts
│   │   ├── setupTests.ts
│   │   └── store.ts
│   └── tsconfig.json
├── LICENSE
└── README.md
```

### Important Files

- **backend/src/resolvers/MessageResolver.ts**: Contains the resolver for the GraphQL message query.
- **backend/src/index.ts**: Sets up the Apollo Server for GraphQL.
- **frontend/src/components/Header.tsx**: Contains the app header with responsive navigation menus and an account menu.
- **frontend/src/components/Footer.tsx**: Contains the app footer.
- **frontend/src/components/Dashboard.tsx**: Contains the dashboard layout.
- **frontend/src/components/Message.tsx**: Fetches and displays a message from the GraphQL server.
- **frontend/src/apolloClient.ts**: Sets up Apollo Client for GraphQL.
- **frontend/src/App.tsx**: Main application component.
- **frontend/src/App.test.tsx**: Tests for the main application component.

## Usage

### Navigation

The navigation menu adapts to different screen sizes:
- On desktop screens, the menu items are displayed as horizontal links in the header.
- On mobile screens, the menu items are hidden behind a hamburger menu.

### Account Menu

The account menu appears in the upper right corner of the header and includes options for "Profile", "My account", and "Logout".

### GraphQL

The project uses Apollo Client to interact with a GraphQL server. The `Message` component demonstrates how to fetch and display data from the server.

## Testing

This project uses Jest for testing. To run the tests, use the following command:

```bash
npm run test
```

## Docker Deployment

To run the project using Docker, ensure Docker is installed and then use the following commands:

```bash
# Build and run the containers
docker-compose up --build

# Stop the containers
docker-compose down
```

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
