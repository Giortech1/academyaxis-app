# Use the official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package files first for better Docker layer caching
COPY package*.json ./

# Install production dependencies only
RUN npm install --omit=dev --no-audit --no-fund --legacy-peer-deps

# Create a non-root user to run the application
RUN addgroup -g 1001 -S nodejs
RUN adduser -S academyaxis -u 1001

# Copy application files (this will include src/modules/)
COPY --chown=academyaxis:nodejs . .

# Switch to non-root user
USER academyaxis

# Expose the port the app runs on (Cloud Run uses PORT env var)
EXPOSE 8080

# Set the PORT environment variable for Cloud Run
ENV PORT=8080

# Define the command to run the application
CMD ["npm", "start"]