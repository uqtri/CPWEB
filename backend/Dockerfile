FROM frolvlad/alpine-gxx:latest

ARG ENV
ENV ENV=${ENV}

# Install Node.js + npm
# RUN apk add --no-cache bash unzip
RUN apk add --no-cache nodejs npm bash unzip
# FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5005
RUN npx prisma generate
# COPY .env.production .env
RUN if [ "$ENV" = "production" ]; then cp .env.production .env; fi

CMD ["npm", "run", "start"]