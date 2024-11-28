# Use Node.js LTS version
FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Build the React app
COPY . .
RUN npm run build

# Use Nginx to serve the frontend
FROM nginx:stable-alpine
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

# Expose frontend port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
