import { cloudinary } from "../config/cloudinary.js";
import { Readable } from "stream";
export const uploadStream = async (buffer) => {
  return new Promise((resolve, reject) => {
    const theTransformStream = cloudinary.uploader.upload_stream(
      {},
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
    let str = Readable.from(buffer);
    str.pipe(theTransformStream);
  });
};
