import PageContainer from "@/src/shared/components/layout/page-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보 처리방침",
};

export default function PrivacyPage() {
  return (
    <PageContainer>
      <h1>개인정보 처리방침</h1>
    </PageContainer>
  );
}
