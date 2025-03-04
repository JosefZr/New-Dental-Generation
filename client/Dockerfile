# ────────────────────────────
# 📌 Stage 1: Build the Vite App
# ────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy source files
COPY . .

# ✅ Copy the .env file into the build stage
COPY /root/setup_files/.env_c .env  

# ✅ Make sure Vite reads the environment variables
RUN npm run build

# ────────────────────────────
# 📌 Stage 2: Serve with Caddy
# ────────────────────────────
FROM caddy:2.7

WORKDIR /srv
COPY --from=builder /app/dist .

# ✅ Pass .env file at runtime (for Caddy, but frontend already built)
COPY /root/setup_files/.env_c /srv/.env  

COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80 443
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]

