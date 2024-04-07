import Page from "@web/src/components/layout/Page";
import Button from "@web/src/components/ui/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <Page>
      <h1 className="text-6xl text-center font-bold">404 Not Found</h1>
      <p className="text-2xl text-center mt-4">
        존재하지 않거나 삭제된 페이지입니다
      </p>
      <div className="flex justify-center mt-8">
        <Button asChild>
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
      </div>
    </Page>
  );
}
