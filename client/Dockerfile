# ──────────────────────
# 📌 Stage 1: Build the Vite React App
# ──────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

# Copy the rest of the source code
COPY . .

# 🔨 Build the Vite app
RUN npm run build

# ──────────────────────
# 📌 Stage 2: Serve with Caddy
# ──────────────────────
FROM caddy:2.7

WORKDIR /srv

# Copy built React files from the builder stage
COPY --from=builder /app/dist .

# Copy the Caddyfile for configuration
COPY Caddyfile /etc/caddy/Caddyfile

# Expose HTTP and HTTPS ports
EXPOSE 80 443

# ✅ Load .env file dynamically at runtime (DO NOT COPY inside Docker)
CMD ["sh", "-c", "set -a && [ -f /env/.env ] && . /env/.env; caddy run --config /etc/caddy/Caddyfile"]

