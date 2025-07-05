import { exec } from "child_process";

// const asyncExec = promisify(exec);

const shellCommand = async (command) => {
  console.log("Executing command:", command);
  return new Promise((resolve, reject) => {
    exec(command, { shell: "/bin/bash" }, (error, stdout, stderr) => {
      console.log(command);
      if (stderr) {
        console.log(`exec stderr`, stderr);
        // reject(stderr);
      }
      if (error) {
        console.log(`exec error`, error);
        reject(error);
      }
      console.log(stdout, "!!");
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
