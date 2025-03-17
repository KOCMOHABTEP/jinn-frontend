FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN yarn

COPY . .
RUN yarn build

FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000
CMD ["yarn", "start"]
