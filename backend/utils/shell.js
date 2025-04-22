import { exec } from "child_process";
import { promisify } from "util";

// const asyncExec = promisify(exec);

const shellCommand = async (command) => {
  return new Promise((resolve, reject) => {
    exec(command, { shell: "powershell.exe" }, (error, stdout, stderr) => {
      if (stderr) {
        console.error(`exec stderr`, stderr);
        reject(stderr);
      }
      if (error) {
        console.error(`exec error`, error);
        reject(error);
      }
      resolve(stdout);
    });
  });
};

// console.log("TRI");
// shellCommand(`docker run --rm -i \`
//        -v D:/TAILIEU/CPWEB/backend/upload/temp/:/code \`
//        -w /code \`
//        frolvlad/alpine-gxx \`
//        sh -c "g++ e6db7c91ae4f3f084e6e.cpp -o e6db7c91ae4f3f084e6e && ./e6db7c91ae4f3f084e6e < 3654f84c60769d7dccc3.txt"`);

export { shellCommand };
