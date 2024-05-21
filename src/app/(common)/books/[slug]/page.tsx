import GetBookBySlug from "@/src/books/api/get-book-by-slug";
import BookBuyLinks from "@/src/books/components/book-buy-links";
import { BOOK_STATUS } from "@/src/books/constants";
import BookLikeViewer from "@/src/likes/components/book-like-viewer";
import PageContainer from "@/src/shared/components/layout/page-container";
import NextImage from "@/src/shared/components/next-image";
import Button from "@/src/shared/components/ui/button";
import { toKoreanDateString } from "@/src/shared/lib/utils";
import { arrayToStringWithComma } from "@/src/shared/utils";
import Tags from "@/src/tags/components/tags";
import Link from "next/link";
import { Suspense } from "react";

interface BookDetailPageProperties {
  params: {
    slug: string;
  };
}

export default async function BooksDetailPage({
  params,
}: BookDetailPageProperties) {
  const decodedSlug = decodeURIComponent(params.slug);
  const book = await GetBookBySlug(decodedSlug);

  if (!book) {
    return (
      <PageContainer>
        Book not found
        <Button asChild>
          <Link href="/books" replace>
            Back to Books
          </Link>
        </Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="flex flex-col max-w-screen-xl mx-auto gap-12 lg:flex-row justify-center">
        <div className="flex-1 p-4">
          <figure className="sticky top-0">
            <NextImage
              src={book.coverImage}
              alt={book.title + "책 표지"}
              width={500}
              height={642}
              className="mx-auto"
            />
            <figcaption className="sr-only">{book.title} 표지</figcaption>
          </figure>
        </div>
        <article className="flex flex-col flex-1">
          <header>
            <h1 className="text-4xl font-medium">{book.title}</h1>
            <div className="text-xl mt-3">
              <h2 className="inline-block">
                {arrayToStringWithComma(book.authors)}
              </h2>
              &nbsp;
              {book.translator.length > 0 && (
                <span>(번역: {book.translator})</span>
              )}
              <h2 className="text-base mt-1">{book.publisher}</h2>
            </div>
          </header>

          <Suspense fallback={<div></div>}>
            <BookLikeViewer bookId={book.id} />
          </Suspense>

          <section className="min-h-64 mt-24">
            <h2 className="text-2xl">소개</h2>
            <p className="text-lg mt-2">{book.description}</p>
          </section>

          <h2 className="text-2xl mt-8">출판 정보</h2>
          <dl className="mt-2">
            <div className="flex gap-4">
              <dt>출판일</dt>
              <dd>
                <time dateTime={book.publishedDate}>
                  {toKoreanDateString(book.publishedDate)}
                </time>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt>ISBN</dt>
              <dd>{book.isbn}</dd>
            </div>
            <div className="flex gap-4">
              <dt>상태</dt>
              <dd>{BOOK_STATUS[book.status].label}</dd>
            </div>
            <div className="flex gap-4">
              <dt>페이지 수</dt>
              <dd>{book.pages} 페이지</dd>
            </div>
          </dl>

          <h2 className="text-2xl mt-8">구매</h2>
          <BookBuyLinks isbn={book.isbn} />

          <h2 className="text-2xl mt-12">태그</h2>
          <Tags tags={book.tags} />
          <footer className="mt-12">
            <p>
              업데이트 날짜:&nbsp;
              <time dateTime={book.updatedAt}>
                {toKoreanDateString(book.updatedAt)}
              </time>
            </p>
          </footer>
        </article>
      </div>
    </PageContainer>
  );
}
