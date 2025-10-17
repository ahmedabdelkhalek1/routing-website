# Use official Node.js image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json ./

# Install app dependencies
RUN npm install

# Copy the app source code
COPY . .

# Expose port for SOCKS5 proxy
EXPOSE 1080

# Start the proxy server
CMD ["npm", "start"]
