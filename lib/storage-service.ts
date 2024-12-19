import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { APIError } from "./api-error";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export class StorageService {
  static async uploadFile(file: File, path: string) {
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: path,
        Body: buffer,
        ContentType: file.type,
      });

      await s3Client.send(command);
      return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${path}`;
    } catch (error) {
      throw new APIError("Failed to upload file", 500, "FILE_UPLOAD_FAILED");
    }
  }

  static async getSignedUrl(path: string) {
    try {
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: path,
      });

      return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    } catch (error) {
      throw new APIError(
        "Failed to generate signed URL",
        500,
        "SIGNED_URL_FAILED"
      );
    }
  }
}
