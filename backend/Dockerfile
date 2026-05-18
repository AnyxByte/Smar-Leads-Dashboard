# Use a lightweight Node LTS base image
FROM node:20-alpine

# Set the operational directory inside the container
WORKDIR /app

# Copy dependency manifests first to leverage Docker's caching layers
COPY package*.json ./

# Explicitly include devDependencies so the TypeScript compiler (tsc) is accessible
RUN npm install --include=dev

# Copy the remaining application source code
COPY . .

# Compile TypeScript down to production-ready JavaScript inside /dist
RUN npm run build

# Expose the port your Express app binds to dynamically
EXPOSE 5000

# Fire up the compiled JavaScript server
CMD ["node", "dist/server.js"]