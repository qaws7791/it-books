import GoogleLoginButton from "@/src/feature/auth/components/google-login-button";
import PageContainer from "@/src/feature/shared/components/layout/page-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
};

export default function LoginPage() {
  return (
    <PageContainer>
      <div className="w-full max-w-5xl p-8 rounded-2xl mx-auto">
        <h1 className="text-4xl text-center font-bold">로그인</h1>
        <p className="text-2xl text-center mt-4">
          구글 계정을 사용하여 로그인하세요.
        </p>
        <GoogleLoginButton />
      </div>
    </PageContainer>
  );
}
