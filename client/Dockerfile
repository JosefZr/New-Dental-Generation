# ────────────────────────────────────────────
# 📌 Stage 1: Build the Vite React App
# ────────────────────────────────────────────
FROM node:22-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package files first (better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the source code
COPY . .

# Build the Vite app
RUN npm run build

# ────────────────────────────────────────────
# 📌 Stage 2: Serve the App using Caddy
# ────────────────────────────────────────────
FROM caddy:2.7

# Set working directory inside the container
WORKDIR /srv

# Copy built Vite app from builder stage
COPY --from=builder /app/dist .

# Copy the Caddyfile for configuration
COPY Caddyfile /etc/caddy/Caddyfile

# Expose HTTP & HTTPS ports
EXPOSE 80 443

# ✅ Allow passing any .env file dynamically at runtime
CMD ["sh", "-c", "caddy run --config /etc/caddy/Caddyfile"]

