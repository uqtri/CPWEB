FROM node:20-alpine AS builder
WORKDIR /app

copy package*.json ./
RUN npm install
COPY . .
RUN npm run build
 
FROM nginx:alpine
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
