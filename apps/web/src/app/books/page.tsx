import Page from "@web/src/components/layout/Page";
import DUMMY from "@web/src/dummy";
import Link from "next/link";

export default function BooksPage() {
  return (
    <Page>
      <h1 className="sr-only">Books</h1>
      <div className="grid grid-cols-card gap-4 overflow-y-auto h-full max-h-full">
        {DUMMY.BOOKS.map((book) => (
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
