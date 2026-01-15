# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# FIX: Remove the vulnerable npm/glob path before final scan
RUN rm -rf /usr/local/lib/node_modules/npm

EXPOSE 3000
CMD ["node", "index.js"]

