# Stage 1 : Build packages 

FROM node:18 AS builder
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app

# Stage 2 : Runs the server

FROM node:18-slim
WORKDIR /app

COPY --from=builder /app /app


CMD ["npm","start"]