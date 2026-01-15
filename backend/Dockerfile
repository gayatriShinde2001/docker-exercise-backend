# Stage 1: Base (Installation)
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Test (Runs the logic checks)
FROM base AS test-stage
ENV NODE_ENV=test
RUN npm test

# Stage 3: Production (The secure, final image)
FROM node:20-alpine AS production
WORKDIR /app
# Only copy what is needed from the 'base' stage
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app .

# Security Fix: Remove npm from the final image
RUN rm -rf /usr/local/lib/node_modules/npm

EXPOSE 3000
CMD ["node", "index.js"]
