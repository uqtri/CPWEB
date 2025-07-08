import fs from "fs";
import { promisify } from "util";
export const mkdirAsync = promisify(fs.mkdir);
export const writeFileAsync = promisify(fs.writeFile);
export const rmdirAsync = promisify(fs.rm);
export const rmFileAsync = promisify(fs.unlink);
export const readdirAsync = promisify(fs.readdir);
