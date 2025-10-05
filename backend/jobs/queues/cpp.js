import { Queue } from "bullmq";
import { connection } from "../ioredis/ioredis.js";

const cppQueue = new Queue("cpp-submissions", {
  connection,
});
export { cppQueue };
// async function main() {
//   const job = await cppQueue.add("submission", { submissionId: 999 });
//   console.log("Job added:", job.id);
// }

// main().catch(console.error);
