import Page from "@web/src/components/layout/Page";
import Button from "@web/src/components/ui/Button";
import DUMMY from "@web/src/dummy";
import { toKoreanDateString } from "@web/src/lib/utils";
import Link from "next/link";

const getBook = (slug: string) => {
  return DUMMY.BOOKS.find((book) => book.slug === slug);
};

interface BookDetailPageProps {
  params: {
    slug: string;
  };
}

export default function BooksDetailPage({ params }: BookDetailPageProps) {
  const decodedSlug = decodeURIComponent(params.slug);
  const book = getBook(decodedSlug);

  if (!book) {
    return (
      <Page>
        Book not found
        <Button asChild>
          <Link href="/books" replace>
            Back to Books
          </Link>
        </Button>
      </Page>
    );
  }

  return (
    <Page>
      <div className="flex flex-col max-w-screen-lg mx-auto gap-12 lg:flex-row justify-around">
        <div>
          <figure>
            <img
              src={book.picture}
              alt={book.title + "책 표지"}
              width={500}
              height={642}
              className="mx-auto"
            />
            <figcaption className="sr-only">{book.title} 표지</figcaption>
          </figure>
        </div>
        <article className="flex flex-col">
          <header>
            <h1 className="text-4xl font-medium">{book.title}</h1>
            <div className="text-xl mt-3">
              <h2 className="inline-block">{book.author}</h2>&nbsp;
              {book.translator && <span>(번역: {book.translator})</span>}
              <h2 className="text-base mt-1">{book.publisher}</h2>
            </div>
          </header>
          <section className="min-h-64 mt-24">
            <h2 className="text-2xl">소개</h2>
            <p className="text-lg mt-2">{book.description}</p>
          </section>

          <h2 className="text-2xl mt-8">구매</h2>
          <div className="flex flex-col gap-4 mt-2">
            <Button asChild variant="outline">
              <Link
                href={`https://www.yes24.com/product/search?query=${book.isbn}`}
                target="_blank"
              >
                YES24에서 구매하기
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link
                href={`https://search.kyobobook.co.kr/search?keyword=${book.isbn}`}
                target="_blank"
              >
                교보문고에서 구매하기
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link
                href={`https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&SearchWord=${book.isbn}`}
                target="_blank"
              >
                알라딘에서 구매하기
              </Link>
            </Button>
          </div>

          <h2 className="text-2xl mt-12">태그</h2>
          <div className="flex gap-4 mt-2 flex-wrap">
            {book.tags.map((tag) => (
              <span
                key={tag}
                className="flex border border-primary rounded-lg text-sm line-clamp-1 whitespace-nowrap"
              >
                <Link href={`/tags/${tag}`} className="px-4 py-1">
                  {tag}
                </Link>
              </span>
            ))}
          </div>

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
    </Page>
  );
}
