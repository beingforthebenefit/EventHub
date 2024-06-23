# Use the official Node.js image.
FROM node:18-alpine

# Set the working directory.
WORKDIR /app

# Copy the dependency files.
COPY package.json package-lock.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the TypeScript code.
RUN npm run build

# Start the application.
CMD ["node", "dist/index.js"]

# Expose the port the app runs on.
EXPOSE 4000
