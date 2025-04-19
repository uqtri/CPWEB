import { exec } from "child_process";

const shellCommand = async (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
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
