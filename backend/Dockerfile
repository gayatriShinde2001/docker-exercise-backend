FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM base AS test-stage
ENV NODE_ENV=test
RUN npm test

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app .
RUN rm -rf /usr/local/lib/node_modules/npm

EXPOSE 3000
CMD ["node", "index.js"]
