# ────────────────────────────────────────────
# 📌 Stage 1: Build the Vite React App
# ────────────────────────────────────────────
FROM node:22-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the source code
COPY . .

#  Load environment variables from .env file at build time
ARG ENV_FILE_PATH
COPY $ENV_FILE_PATH .env
RUN cat .env  # Debugging: Check if .env is copied correctly

# Build the Vite app (Vite reads from .env automatically)
RUN npm run build

# ────────────────────────────────────────────
#  Stage 2: Serve with Caddy
# ────────────────────────────────────────────
FROM caddy:2.7

# Set working directory inside the container
WORKDIR /srv

# Copy built React files from the builder stage
COPY --from=builder /app/dist .

# Copy the Caddyfile for configuration
COPY Caddyfile /etc/caddy/Caddyfile

# Expose HTTP and HTTPS ports
EXPOSE 80 443

# ✅ Load runtime environment variables dynamically
CMD ["sh", "-c", "export $(grep -v '^#' /env/.env | xargs) && caddy run --config /etc/caddy/Caddyfile"]

