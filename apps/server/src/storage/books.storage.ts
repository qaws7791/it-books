import { PutObjectCommand } from "@aws-sdk/client-s3";
import AppError from "@server/src/lib/AppError";
import s3Client from "@server/src/storage";
import storage from "@server/src/storage";
import imageType from "image-type";
import { nanoid } from "nanoid";

export const saveBookImage = async ({ buffer }: { buffer: Buffer }) => {
  try {
    const type = await imageType(buffer);
    if (!type) {
      throw new AppError("InvalidImageType");
    }
    const newFilename = nanoid() + "." + type.ext;
    const putObjectCommand = new PutObjectCommand({
      Bucket: "book-image",
      Key: newFilename,
      Body: buffer,
    });

    const res = await s3Client.send(putObjectCommand);

    return {
      filename: newFilename,
      type: type.mime,
    };
  } catch (error) {
    throw new AppError("FailedToSaveBookImage");
  }
};
