# Stage 1 : Build packages 

FROM node:18 AS builder
WORKDIR /app
COPY package*json /app/
RUN npm install

# Stage 2 : Runs the server

FROM node:18-slim
WORKDIR /app

COPY /app /app
COPY . /app

EXPOSE 3000

CMD ["npm","start"]