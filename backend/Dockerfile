FROM node:18.19.1-alpine

# Build tools để compile các native package
RUN apk add --no-cache bash unzip build-base python3

WORKDIR /app

# Copy package.json & package-lock.json
COPY package*.json ./

# Cài dependencies
RUN npm install

# Copy source code
COPY . .

# Prisma generate
RUN npx prisma generate

# Copy env nếu production
ARG ENV
RUN if [ "$ENV" = "production" ]; then cp .env.production .env; fi

EXPOSE 5005
CMD ["npm", "run", "start"]
