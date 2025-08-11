FROM node:20-alpine AS builder
WORKDIR /app

copy package*.json ./
RUN npm install
COPY . .
RUN npm run build
 FROM node:20-alpine AS dev
WORKDIR /app

## DEVELOPMENT
COPY package*.json ./
RUN npm install

COPY . .

# Hot reload / dev server
CMD ["npm", "run", "dev"]
## PRODUCTION

FROM nginx:alpine AS production
COPY ./nginx/default.dev.conf /tmp/default.dev.conf
COPY ./nginx/default.conf /tmp/default.conf

# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY ./nginx/default.dev.conf /etc/nginx/conf.d/default.conf
 
RUN if [ "$ENV" = "production" ]; then \
        cp /tmp/default.conf /etc/nginx/conf.d/default.conf ; \
    else \
        cp /tmp/default.dev.conf /etc/nginx/conf.d/default.conf ; \
    fi

COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["npm", "run", "dev"]