import api from "@/src/shared/api";

interface GetBookImagePresignedUrlInput {
  type: string;
  size: number;
}

interface GetBookImagePresignedUrlOutput {
  bucket: string;
  uploadUrl: string;
  publicUrl: string;
  key: string;
}

export default function getBookImagePresignedUrl(
  input: GetBookImagePresignedUrlInput,
): Promise<GetBookImagePresignedUrlOutput> {
  return api.post("s3/presigned-url/book-image", input);
}
