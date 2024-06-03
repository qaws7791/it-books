import api from "@/src/feature/shared/api";

interface GetBookImagePresignedUrlInput {
  type: string;
  size: number;
}

interface GetBookImagePresignedUrlOutput {
  bucket: string;
  key: string;
  path: string;
  uploadUrl: string;
}

export default function getBookImagePresignedUrl(
  input: GetBookImagePresignedUrlInput,
): Promise<GetBookImagePresignedUrlOutput> {
  return api.post("s3/presigned-url/book-image", input);
}
