import Page from "@web/src/components/layout/Page";
import Button from "@web/src/components/ui/Button";
import DUMMY from "@web/src/dummy";
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
      <div className="flex flex-col max-w-screen-lg mx-auto gap-8 lg:flex-row">
        <div>
          <img
            src={book.picture}
            alt={book.title}
            width={500}
            height={700}
            className="mx-auto"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-4xl font-medium">{book.title}</h1>
          <div className="text-xl mt-3">
            <h2 className="inline-block">{book.author}</h2>&nbsp;
            {book.translator && <span>(번역: {book.translator})</span>}
            <h2 className="text-base mt-1">{book.publisher}</h2>
          </div>
          <div className="min-h-64 mt-24">
            <p className="text-lg">{book.description}</p>
          </div>

          <h2 className="text-2xl mt-8">구매</h2>
          <div className="flex flex-col gap-4 mt-3">
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
          <div className="flex gap-4 mt-4 flex-wrap">
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
        </div>
      </div>
    </Page>
  );
}
