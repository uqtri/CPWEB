import IORedis from "ioredis";

import dotenv from "dotenv";
dotenv.config({});
console.log(`Host: ${process.env.REDIS_HOST}`);
console.log(`Port: ${process.env.REDIS_PORT}`);
const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  maxRetriesPerRequest: null,
});

export { connection };
