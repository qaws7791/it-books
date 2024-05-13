import CollectionClient from "@/src/app/(common)/collections/[slug]/collection-client";
import ShareButton from "@/src/app/(common)/collections/[slug]/share-button";
import DUMMY from "@/src/dummy";
import PageContainer from "@/src/shared/components/layout/page-container";
import Button from "@/src/shared/components/ui/button";
import { toKoreanDateString } from "@/src/shared/lib/utils";
import Link from "next/link";

interface CollectionDetailPageProperties {
  params: {
    slug: string;
  };
}

function getCollection(slug: string) {
  return DUMMY.LiST_DETAILS.find((list) => list.slug === slug);
}

export default function CollectionDetailPage({
  params,
}: CollectionDetailPageProperties) {
  const decodedSlug = decodeURIComponent(params.slug);
  const collection = getCollection(decodedSlug);

  if (!collection) {
    return (
      <PageContainer>
        <h1 className="text-4xl text-center">Collection not found</h1>
        <div className="flex justify-center mt-8">
          <Button asChild>
            <Link href="/collections" replace>
              Back to Collections
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
            <h1 className="text-4xl font-medium">{collection.name}</h1>
            <h2 className="sr-only">소개</h2>
            <p className="text-lg mt-2">{collection.description}</p>
            <p className="text-sm">
              업데이트 날짜:&nbsp;
              <time dateTime={collection.updatedAt}>
                {toKoreanDateString(collection.updatedAt)}
              </time>
            </p>
            <div className="mt-4">
              <ShareButton url={`localhost:3000/collections/${params.slug}`} />
            </div>
          </header>

          <section className="min-h-64 mt-24">
            <h2 className="sr-only">책 목록</h2>
            <CollectionClient books={collection.books} />
          </section>
        </article>
      </div>
    </PageContainer>
  );
}
