import Page from "@/src/shared/components/layout/Page";
import DUMMY from "@/src/dummy";
import Link from "next/link";

interface BookDetailPageProps {
  params: {
    slug: string;
  };
}

const getBookByTag = (tag: string) => {
  return DUMMY.BOOKS.filter((book) => book.tags.includes(tag));
};

export default function TaggedBooksPage({ params }: BookDetailPageProps) {
  const decodedSlug = decodeURIComponent(params.slug);
  const books = getBookByTag(decodedSlug);

  return (
    <Page>
      <h1 className="text-4xl text-center">
        &quot;{decodedSlug}&quot; 태그를 가진 책들
      </h1>
      <div className="grid grid-cols-card gap-4 overflow-y-auto mt-4">
        {books.map((book) => (
          <Link
            href={`/books/${book.slug}`}
            key={book.id}
            className="rounded-xl overflow-hidden hover:bg-outline/10 p-4"
          >
            <div>
              <img
                src={book.picture}
                alt={book.title}
                className="shadow-md mx-auto"
                width={200}
              />
            </div>
            <h2 className="font-semibold text-center mt-2">{book.title}</h2>
            <p className="text-outline text-center">{book.author}</p>
          </Link>
        ))}
      </div>
    </Page>
  );
}
