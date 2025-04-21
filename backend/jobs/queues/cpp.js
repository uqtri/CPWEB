import { Queue } from "bullmq";
import { connection } from "../ioredis/ioredis.js";

const cppQueue = new Queue("cpp-submissions", {
  connection,
});
const cppTestCase = new Queue("cpp-testcase", {
  connection,
});
export { cppQueue };
