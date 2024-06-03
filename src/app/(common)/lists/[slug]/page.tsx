import ListClient from "@/src/app/(common)/lists/[slug]/list-client";
import ShareButton from "@/src/app/(common)/lists/[slug]/share-button";
import getListBySlug from "@/src/feature/lists/api/get-list-by-slug";
import PageContainer from "@/src/feature/shared/components/layout/page-container";
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
    const list = await getListBySlug(decodedSlug);
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
    const list = await getListBySlug(decodedSlug);
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
              <ShareButton url={`localhost:3000/lists/${params.slug}`} />
            </div>
          </header>

          <section className="min-h-64 mt-24">
            <h2 className="sr-only">책 목록</h2>
            <ListClient listItems={list.listItems} />
          </section>
        </article>
      </div>
    </PageContainer>;
  } catch {
    return notFound();
  }
}
