import {
  ACCESS_KEY_ID,
  BUCKET,
  REGION,
  REPORTS_SESSIONS_MANAGMENT,
  SECRET_ACCESS_KEY,
} from "../config/enviroments.js";

import AWS from "aws-sdk";
import { extension } from "mime-types";

AWS.config.update({
  region: REGION,
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3();
export const uploadFileS3 = async (req, fileParamName) => {
  try {
    if(req.files===null) return [];
    const allFiles = req.files[fileParamName];
    const files = [];
    for (const file of (Array.isArray(allFiles)?allFiles:[allFiles])) {
      const fileContent = Buffer.from(file.data, "binary");
      let name = `${Date.now()}.${extension(file.mimetype)}`;
      const params = {
        Bucket: BUCKET,
        Key: `${REPORTS_SESSIONS_MANAGMENT}/${name}`, // File name you want to save as in S3
        Body: fileContent,
        ContentType: file.mimetype
      };
      if (
        await new Promise((resolve, reject) => {
          s3.upload(params, function (err, data) {
            if (err) {
              throw err;
            }
            resolve(true);
          });
        })
      )
        files.push(name);
    }
    return files;
  } catch (error) {
    return error;
  }
};

export const downloadFileS3 = async (file,res) => {
    try {
        const data = await s3
          .getObject({
            Bucket: BUCKET,
            Key: `${REPORTS_SESSIONS_MANAGMENT}/${file}`,
          })
          .promise();
          let buffer = Buffer.from(data.Body, "binary")
          return `data:${data.ContentType};base64,${buffer.toString('base64')}`;
      } catch (headErr) {
        return {data:new Error('file not found')}
      }
}
