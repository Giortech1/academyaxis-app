# Use the official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

# Copy the rest of the application code
COPY . .

# Create a non-root user to run the application
RUN addgroup -g 1001 -S nodejs
RUN adduser -S academyaxis -u 1001

# Change ownership of the app directory to the nodejs user
RUN chown -R academyaxis:nodejs /app
USER academyaxis

# Expose the port the app runs on
EXPOSE 8080

# Define the command to run the application
CMD ["npm", "start"]