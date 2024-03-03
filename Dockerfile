# Stage 1 - the build process

# The as build-deps part allows us to name this part of the build process. That name can then be referred to when configuring the production environment later.
FROM node:18.18.2-alpine as build

ARG MODULE

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json .

COPY apps/body/package.json ./apps/body/package.json
COPY apps/header/package.json ./apps/header/package.json
COPY apps/host/package.json ./apps/host/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/helpers/package.json ./packages/helpers/package.json
COPY packages/tsconfig/package.json ./packages/tsconfig/package.json

# Install deps from package-lock.json
RUN npm ci

COPY . .

# Build app
RUN npm run build:${MODULE}

# Bundle static assets with nginx stage
FROM nginx:1.25-alpine AS static

ARG MODULE

# Copy built assets from builder
COPY --from=build /app/apps/${MODULE}/dist /usr/share/nginx/html

# Add our nginx.conf
COPY --from=build /app/apps/${MODULE}/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]