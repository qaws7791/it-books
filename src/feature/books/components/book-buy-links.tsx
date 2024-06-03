import { BOOK_BUY_LINKS } from "@/src/feature/books/constants";
import Button from "@/src/ui/components/button";
import Link from "next/link";

interface BookBuyLinksProperties {
  isbn: string;
}

export default function BookBuyLinks({ isbn }: BookBuyLinksProperties) {
  return (
    <div className="flex flex-col gap-4 mt-2">
      {BOOK_BUY_LINKS.map((link) => (
        <Button key={link.site} asChild>
          <Link href={`${link.url}${isbn}`} target="_blank">
            {link.site}에서 구매하기
          </Link>
        </Button>
      ))}
    </div>
  );
}
