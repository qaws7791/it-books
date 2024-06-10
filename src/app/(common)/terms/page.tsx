import PageContainer from "@/src/feature/shared/components/layout/page-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "서비스 이용약관",
};

export default function ServiceTermsPage() {
  return (
    <PageContainer>
      <h1>서비스 이용약관</h1>
    </PageContainer>
  );
}
