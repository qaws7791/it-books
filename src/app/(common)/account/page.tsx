import AccountClient from "@/src/app/(common)/account/account-client";
import PageContainer from "@/src/feature/shared/components/layout/page-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
};

export default function AccountPage() {
  return (
    <PageContainer>
      <AccountClient />
    </PageContainer>
  );
}
