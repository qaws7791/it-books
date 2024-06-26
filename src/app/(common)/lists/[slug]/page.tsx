import ShareButton from "@/src/app/(common)/lists/[slug]/share-button";
import BookPreview from "@/src/feature/books/components/book-preview";
import fetchListBySlug from "@/src/feature/lists/api/fetch-list-by-slug";
import PageContainer from "@/src/feature/shared/components/layout/page-container";
import { SITE_URL } from "@/src/feature/shared/constants/site-config.constant";
import { toKoreanDateString } from "@/src/feature/shared/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface ListDetailPageProperties {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ListDetailPageProperties): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.slug);
  try {
    const list = await fetchListBySlug(decodedSlug);
    return {
      title: list.title,
    };
  } catch {
    return {
      title: "리스트를 찾을 수 없습니다",
    };
  }
}

export default async function ListDetailPage({
  params,
}: ListDetailPageProperties) {
  const decodedSlug = decodeURIComponent(params.slug);
  try {
    const list = await fetchListBySlug(decodedSlug);
    return (
      <PageContainer>
        <div className="flex flex-col max-w-screen-lg mx-auto gap-12">
          <article className="flex flex-col">
            <header className="text-center">
              <h1 className="text-4xl font-medium">{list.title}</h1>
              <h2 className="sr-only">소개</h2>
              <p className="text-lg mt-2">{list.description}</p>
              <p className="text-sm">
                업데이트 날짜:&nbsp;
                <time dateTime={list.updatedAt}>
                  {toKoreanDateString(list.updatedAt)}
                </time>
              </p>
              <div className="mt-4">
                <ShareButton url={`${SITE_URL}/lists/${params.slug}`} />
              </div>
            </header>

            <section className="min-h-64 mt-24">
              <h2 className="sr-only">책 목록</h2>
              <div className="grid grid-cols-card gap-4">
                {list.listItems.map((listItem) => {
                  const book = listItem.book;
                  return <BookPreview key={listItem.id} book={book} />;
                })}
              </div>
            </section>
          </article>
        </div>
      </PageContainer>
    );
  } catch {
    return notFound();
  }
}
