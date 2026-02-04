# Use official Node image
FROM node:22.21.0

# Set working directory inside container
WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose backend port
EXPOSE 7000

# Start the app
CMD ["node", "app.js"]

#docker run -p 5000:5000 my-backend