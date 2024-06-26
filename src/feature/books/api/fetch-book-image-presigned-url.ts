import api from "@/src/feature/shared/api";

interface FetchBookImagePresignedUrlInput {
  type: string;
  size: number;
}

interface FetchBookImagePresignedUrlOutput {
  bucket: string;
  key: string;
  path: string;
  uploadUrl: string;
}

export default function fetchBookImagePresignedUrl(
  input: FetchBookImagePresignedUrlInput,
): Promise<FetchBookImagePresignedUrlOutput> {
  return api.post("s3/presigned-url/book-image", input);
}
