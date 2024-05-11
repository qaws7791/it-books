import PageContainer from "@/src/shared/components/layout/page-container";
import DUMMY from "@/src/dummy";
import Link from "next/link";
import NextImage from "@/src/shared/components/next-image";

interface SearchPageProperties {
  searchParams: {
    query: string;
  };
}

const searchBooks = (query: string) => {
  return DUMMY.BOOKS.filter(
    (book) => book.title.includes(query) || book.authors.includes(query),
  );
};

export default function SearchPage({ searchParams }: SearchPageProperties) {
  const decodedQuery = decodeURIComponent(searchParams.query);
  const books = searchBooks(decodedQuery);

  return (
    <PageContainer>
      <h1 className="text-4xl text-center">
        &quot;{decodedQuery}&quot; 검색 결과
      </h1>
      <div className="grid grid-cols-card gap-4 overflow-y-auto mt-4">
        {books.map((book) => (
          <Link
            href={`/books/${book.slug}`}
            key={book.id}
            className="rounded-xl overflow-hidden hover:bg-outline/10 p-4"
          >
            <div>
              <NextImage
                src={book.coverImage}
                alt={book.title}
                className="shadow-md mx-auto"
                width={200}
                height={300}
              />
            </div>
            <h2 className="font-bold text-center mt-2">{book.title}</h2>
            <p className="text-outline text-center">{book.authors}</p>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
