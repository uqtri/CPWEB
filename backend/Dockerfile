FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5005
RUN npx prisma generate
COPY .env.production .env
CMD ["npm", "run", "start"]