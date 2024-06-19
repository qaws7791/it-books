import { BookWithCategory } from "@/src/feature/books/types";
import NextImage from "@/src/feature/shared/components/next-image";
import { arrayToStringWithComma } from "@/src/feature/shared/utils";
import Link from "next/link";

interface BookPreviewProps {
  book: BookWithCategory;
}

export default function BookPreview({ book }: BookPreviewProps) {
  return (
    <Link
      key={book.id}
      href={`/books/${book.slug}`}
      className="rounded-xl hover:bg-outline/10"
    >
      <div className="flex justify-center">
        <div className="relative book-border">
          <NextImage
            src={book.coverImage}
            alt={book.title}
            className="relative overflow-hidden mx-auto shadow-elevation shadow-black/15"
            width={200}
            height={257}
          />
        </div>
      </div>
      <h2 className="font-bold text-center mt-2 line-clamp-2">{book.title}</h2>
      <p className="text-outline text-center column line-clamp-1">
        {arrayToStringWithComma(book.authors)}
      </p>
    </Link>
  );
}
