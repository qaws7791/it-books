import GoogleLoginButton from "@/src/auth/components/google-login-button";
import PageContainer from "@/src/shared/components/layout/page-container";

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
