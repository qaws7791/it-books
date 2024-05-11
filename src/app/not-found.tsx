import Button from "@/src/shared/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-auto">
      <h1 className="text-6xl text-center font-bold mt-24">404 Not Found</h1>
      <p className="text-2xl text-center mt-4">
        존재하지 않거나 삭제된 페이지입니다
      </p>
      <div className="flex justify-center mt-8">
        <Button asChild>
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
      </div>
    </div>
  );
}
