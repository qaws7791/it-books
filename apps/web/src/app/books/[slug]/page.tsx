import Page from "@web/src/components/layout/Page";
import Button from "@web/src/components/ui/Button";
import DUMMY from "@web/src/dummy";
import Link from "next/link";

const getBook = (slug: string) => {
  return DUMMY.BOOKS.find((book) => book.slug === slug)
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
    return <Page>Book not found
      <Button asChild>
        <Link href="/books" replace>Back to Books</Link>
      </Button>
    </Page>;
  }

  return (
    <Page>
      <div className="flex">
        <div>
          <img src={book.picture} alt={book.title} width={200} height={300} />
        </div>
        <div className="flex flex-col">
          <h1>{book.title}</h1>
          <div>
            <p>저자: {book.author}</p>
            {book.translator && <p>역자: {book.translator}</p>}
          </div>
          <p>{book.description}</p>
          <div className="flex gap-4">
            {book.tags.map((tag) => (
              <span key={tag}>
                <Link href={`/tags/${tag}`}>{tag}</Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}
