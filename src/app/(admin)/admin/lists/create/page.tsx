import ListCreateForm from "@/src/app/(admin)/admin/lists/create/list-create-form";
import PageContainer from "@/src/shared/components/layout/page-container";

export default function ListCreateAdminPage() {
  return (
    <PageContainer>
      <h1 className="text-2xl font-bold">리스트 추가</h1>
      <ListCreateForm />
    </PageContainer>
  );
}
