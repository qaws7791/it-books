import PageContainer from "@/src/feature/shared/components/layout/page-container";
import Button from "@/src/ui/components/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <PageContainer>
      <h1 className="text-4xl text-center">List not found</h1>
      <div className="flex justify-center mt-8">
        <Button asChild>
          <Link href="/lists" replace>
            Back to Lists
          </Link>
        </Button>
      </div>
    </PageContainer>
  );
}
