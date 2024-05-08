import Page from "@/src/shared/components/layout/Page";

interface HomeProps {
  searchParams: {
    id: string;
  };
}

export default async function Home(props: HomeProps) {
  return (
    <Page>
      <div className="w-full max-w-5xl p-8 rounded-2xl mx-auto">
        <h1 className="text-8xl text-center font-bold">IT BOOKS</h1>
        <p className="text-2xl text-center mt-4">
          좋은 책들을 발견하고, 빠르게 독서를 시작하세요
        </p>
      </div>
    </Page>
  );
}
