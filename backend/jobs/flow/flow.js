import { FlowProducer } from "bullmq";
import { connection } from "../ioredis/ioredis.js";
export const flowProducer = new FlowProducer({
  connection: {
    ...connection,
    maxRetriesPerRequest: 3,
  },
});
