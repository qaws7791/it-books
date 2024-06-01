import PageContainer from "@/src/shared/components/layout/page-container";

export default function Home() {
  return (
    <PageContainer>
      <div className="w-full max-w-5xl p-8 rounded-2xl mx-auto">
        <h1 className="text-6xl sm:text-8xl text-center font-bold">IT BOOKS</h1>
        <p className="text-2xl text-center mt-4">
          좋은 책들을 발견하고, 빠르게 독서를 시작하세요
        </p>
      </div>
    </PageContainer>
  );
}
