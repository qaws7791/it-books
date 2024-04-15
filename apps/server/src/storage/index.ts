import { S3Client } from "@aws-sdk/client-s3";
import env from "@server/src/lib/env";

const s3Client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

export default s3Client;
