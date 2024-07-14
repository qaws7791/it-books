import ListUpdateForm from "@/src/app/(admin)/admin/lists/update/list-update-form";
import PageContainer from "@/src/feature/shared/components/layout/page-container";
import QueryString from "@/src/feature/shared/utils/querystring";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface AdminListsUpdatePageProperties {
  searchParams: {
    listId?: string;
  };
}

export default function AdminListsUpdatePage({
  searchParams,
}: AdminListsUpdatePageProperties) {
  const listId = QueryString.toNumber(searchParams?.listId);

  if (!listId) {
    return <PageContainer>리스트 ID가 필요합니다.</PageContainer>;
  }

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold">도서 업데이트</h1>
      <ErrorBoundary
        fallback={
          <div>
            <p>에러가 발생했습니다. 책을 수정할 수 없습니다.</p>
          </div>
        }
      >
        <Suspense fallback="책을 불러오는 중">
          <ListUpdateForm listId={listId} />
        </Suspense>
      </ErrorBoundary>
    </PageContainer>
  );
}
