import { exec } from "child_process";
import { promisify } from "util";

// const asyncExec = promisify(exec);

const shellCommand = async (command) => {
  return new Promise((resolve, reject) => {
    asyncExec(command, (error, stdout, stderr) => {
      if (stderr) {
        // console.error(`stderr: ${stderr}`);
        reject(stderr);
      }
      if (error) {
        // console.error(`exec error: ${error}`);
        reject(error);
      }
      resolve(stdout);
    });
  });
};
export { shellCommand };
