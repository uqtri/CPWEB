import { FlowProducer } from "bullmq";
import IORedis from "ioredis";
const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});
export const flowProducer = new FlowProducer({
  connection,
});

flowProducer.on("error", (error) => {
  console.error("FlowProducer error:", error.toString());
});
