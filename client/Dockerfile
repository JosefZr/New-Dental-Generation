# Use the official Node.js image to build the React app
FROM node:22-alpine as build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the app's source code
COPY . .

# Set environment variables (important for .env)
ARG UPLOADTHING_SECRET
ARG UPLOADTHING_APP_ID
ARG VAPID_SUBJECT
ARG VAPID_PUBLIC_KEY
ARG VAPID_PRIVATE_KEY
ARG VITE_DEFAULT_AVATAR
ARG VITE_DEFAULT_BG
ARG VITE_UPLOAD_AVATAR_URL
ARG VITE_SERVER_API
ARG VITE_SOCKET

# Persist ARG values as ENV variables for Vite
ENV UPLOADTHING_SECRET=$UPLOADTHING_SECRET
ENV UPLOADTHING_APP_ID=$UPLOADTHING_APP_ID
ENV VAPID_SUBJECT=$VAPID_SUBJECT
ENV VAPID_PUBLIC_KEY=$VAPID_PUBLIC_KEY
ENV VAPID_PRIVATE_KEY=$VAPID_PRIVATE_KEY
ENV VITE_DEFAULT_AVATAR=$VITE_DEFAULT_AVATAR
ENV VITE_DEFAULT_BG=$VITE_DEFAULT_BG
ENV VITE_UPLOAD_AVATAR_URL=$VITE_UPLOAD_AVATAR_URL
ENV VITE_SERVER_API=$VITE_SERVER_API
ENV VITE_SOCKET=$VITE_SOCKET
# Build the React app
RUN npm run build

# Use Nginx for serving the React app
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf  # <--- Add this line

# Copy built React files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
