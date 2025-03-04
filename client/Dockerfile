# ──────────────────────
# 📌 Stage 1: Build the Vite React App
# ──────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the source code
COPY . .

# ──────────────────────
# ✅ Pass environment variables at build time
# ──────────────────────
ARG UPLOADTHING_SECRET
ARG UPLOADTHING_APP_ID
ARG UPLOAD
ARG VITE_SOCKET
ARG VITE_SERVER_API
ARG VAPID_SUBJECT
ARG VAPID_PUBLIC_KEY
ARG VAPID_PRIVATE_KEY
ARG VITE_DEFAULT_AVATAR
ARG VITE_DEFAULT_BG
ARG VITE_UPLOAD_AVATAR_URL

# Persist ARG values into an .env file for Vite
RUN echo "VITE_SOCKET=$VITE_SOCKET" >> .env \
    && echo "VITE_SERVER_API=$VITE_SERVER_API" >> .env \
    && echo "VAPID_SUBJECT=$VAPID_SUBJECT" >> .env \
    && echo "VAPID_PUBLIC_KEY=$VAPID_PUBLIC_KEY" >> .env \
    && echo "VAPID_PRIVATE_KEY=$VAPID_PRIVATE_KEY" >> .env \
    && echo "VITE_DEFAULT_AVATAR=$VITE_DEFAULT_AVATAR" >> .env \
    && echo "VITE_DEFAULT_BG=$VITE_DEFAULT_BG" >> .env \
    && echo "VITE_UPLOAD_AVATAR_URL=$VITE_UPLOAD_AVATAR_URL" >> .env \
    && echo "UPLOADTHING_SECRET=$UPLOADTHING_SECRET" >> .env \
    && echo "UPLOADTHING_APP_ID=$UPLOADTHING_APP_ID" >> .env \
    && echo "UPLOAD=$UPLOAD" >> .env

# Build the React (Vite) app
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

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]

