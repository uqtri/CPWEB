FROM node:20-alpine as builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build
EXPOSE 5173

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
