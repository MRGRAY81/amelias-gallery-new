#!/bin/bash
# Startup script for Amelia's Gallery

echo "Starting Amelia's Gallery server..."

cd /app/server

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start the server
echo "Starting Node.js server on port 4000..."
node index.js

echo "Server is running at http://localhost:4000"
echo "Admin login: amelia@admin.com / AmeliaSecure123"
