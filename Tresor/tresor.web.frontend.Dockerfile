# Build Phase
FROM node:18 AS build
WORKDIR /app
COPY ./tresor-web/package*.json ./
RUN yarn install
COPY ./tresor-web/ ./
RUN yarn build

# Development Phase
FROM node:18-alpine AS dev
RUN adduser -D -u 1001 app
USER app

# Install dependencies 
WORKDIR /app
COPY ./tresor-web/package.json ./tresor-web/yarn.lock ./
RUN yarn install

# Copy source files into application directory
COPY --chown=app:app ./tresor-web/ ./
EXPOSE 3000
CMD ["yarn", "dev"]
# Serving Phase
FROM nginx:alpine AS serve
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
