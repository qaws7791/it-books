import GetBookBySlug from "@/src/feature/books/api/get-book-by-slug";
import BookBuyLinks from "@/src/feature/books/components/book-buy-links";
import { BOOK_STATUS } from "@/src/feature/books/constants";
import BookLikeViewer from "@/src/feature/likes/components/book-like-viewer";
import PageContainer from "@/src/feature/shared/components/layout/page-container";
import NextImage from "@/src/feature/shared/components/next-image";
import { toKoreanDateString } from "@/src/feature/shared/lib/utils";
import Tags from "@/src/feature/tags/components/tags";
import Button from "@/src/ui/components/button";
import { Metadata } from "next";
import Link from "next/link";
import { Fragment, Suspense } from "react";

interface BookDetailPageProperties {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: BookDetailPageProperties): Promise<Metadata> {
  const decodedQuery = decodeURIComponent(params.slug || "");
  const book = await GetBookBySlug(decodedQuery);
  return {
    title: book.title,
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
          <figure className="sticky top-24">
            <NextImage
              src={book.coverImage}
              alt={book.title + "책 표지"}
              width={500}
              height={642}
              className="mx-auto shadow-elevation shadow-shadow/10 rounded-lg border-outline"
            />
            <figcaption className="sr-only">{book.title} 표지</figcaption>
          </figure>
        </div>
        <article className="flex flex-col flex-1 p-2">
          <header>
            <h1 className="text-2xl md:text-3xl">{book.title}</h1>
            <div className="text-base md:text-xl mt-3">
              <h2 className="sr-only">저자</h2>
              <div className="inline-block  text-on-surface-variant/70">
                {book.authors.map((author, index) => (
                  <Fragment key={author}>
                    <Link
                      key={author}
                      href={`/search?query=${encodeURIComponent(author)}`}
                    >
                      {author}
                    </Link>
                    {index !== book.authors.length - 1 && ", "}
                  </Fragment>
                ))}
              </div>
              {book.translators.length > 0 ? (
                <div className="text-on-surface-variant/70 mt-4 text-base">
                  <span>번역: </span>
                  {book.translators.map((translator) => (
                    <Fragment key={translator}>
                      <Link
                        key={translator}
                        href={`/search?query=${encodeURIComponent(translator)}`}
                      >
                        {translator}
                      </Link>
                    </Fragment>
                  ))}
                </div>
              ) : null}

              <h2 className="text-lg mt-1">
                <Link
                  href={`/search?query=${encodeURIComponent(book.publisher)}`}
                >
                  {book.publisher}
                </Link>
              </h2>
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
          <dl className="mt-2 gap-4  grid grid-cols-2 p-4">
            <div className="inline-flex gap-4 border border-outline flex-col p-2 rounded-xl flex-1 text-center">
              <dt className="font-bold">상태</dt>
              <dd>{BOOK_STATUS[book.status].label}</dd>
            </div>
            <div className="inline-flex gap-4 border border-outline flex-col p-2 rounded-xl flex-1 text-center">
              <dt className="font-bold">출판일</dt>
              <dd>
                <time dateTime={book.publishedDate}>
                  {toKoreanDateString(book.publishedDate)}
                </time>
              </dd>
            </div>
            <div className="inline-flex gap-4 border border-outline flex-col p-2 rounded-xl flex-1 text-center">
              <dt className="font-bold">쪽 수</dt>
              <dd>{book.pages}</dd>
            </div>
            <div className="inline-flex gap-4 border border-outline flex-col p-2 rounded-xl flex-1 text-center">
              <dt className="font-bold">ISBN</dt>
              <dd>{book.isbn}</dd>
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
