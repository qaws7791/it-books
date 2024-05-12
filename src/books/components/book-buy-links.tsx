import { BOOK_BUY_LINKS } from "@/src/books/constants";
import Button from "@/src/shared/components/ui/button";
import Link from "next/link";

interface BookBuyLinksProperties {
  isbn: string;
}

export default function BookBuyLinks({ isbn }: BookBuyLinksProperties) {
  return (
    <div className="flex flex-col gap-4 mt-2">
      {BOOK_BUY_LINKS.map((link) => (
        <Button key={link.site}>
          <Link href={`${link.url}${isbn}`}>{link.site}에서 구매하기</Link>
        </Button>
      ))}
    </div>
  );
}
