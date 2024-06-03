import ListClient from "@/src/app/(common)/lists/[slug]/list-client";
import ShareButton from "@/src/app/(common)/lists/[slug]/share-button";
import DUMMY from "@/src/dummy";
import PageContainer from "@/src/feature/shared/components/layout/page-container";
import { toKoreanDateString } from "@/src/feature/shared/lib/utils";
import Button from "@/src/ui/components/button";
import { Metadata } from "next";
import Link from "next/link";

interface ListDetailPageProperties {
  params: {
    slug: string;
  };
}

function getList(slug: string) {
  return DUMMY.LiST_DETAILS.find((list) => list.slug === slug);
}

export function generateMetadata({
  params,
}: ListDetailPageProperties): Metadata {
  const decodedSlug = decodeURIComponent(params.slug);
  const list = getList(decodedSlug);

  return {
    title: list?.name || "리스트를 찾을 수 없습니다.",
  };
}

export default function ListDetailPage({ params }: ListDetailPageProperties) {
  const decodedSlug = decodeURIComponent(params.slug);
  const list = getList(decodedSlug);

  if (!list) {
    return (
      <PageContainer>
        <h1 className="text-4xl text-center">List not found</h1>
        <div className="flex justify-center mt-8">
          <Button asChild>
            <Link href="/lists" replace>
              Back to Lists
            </Link>
          </Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="flex flex-col max-w-screen-lg mx-auto gap-12">
        <article className="flex flex-col">
          <header className="text-center">
            <h1 className="text-4xl font-medium">{list.name}</h1>
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
            <ListClient books={list.books} />
          </section>
        </article>
      </div>
    </PageContainer>
  );
}
