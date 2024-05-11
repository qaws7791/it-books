import Button from "@/src/shared/components/ui/button";
import Link from "next/link";

interface BookBuyLinksProperties {
  isbn: string;
}
/**
 *TODO: 컴포넌트에서 상수로 데이터 분리하기
 */

export default function BookBuyLinks({ isbn }: BookBuyLinksProperties) {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <Button asChild variant="outline">
        <Link
          href={`https://www.yes24.com/product/search?query=${isbn}`}
          target="_blank"
        >
          YES24에서 구매하기
        </Link>
      </Button>
      <Button asChild variant="outline">
        <Link
          href={`https://search.kyobobook.co.kr/search?keyword=${isbn}`}
          target="_blank"
        >
          교보문고에서 구매하기
        </Link>
      </Button>
      <Button asChild variant="outline">
        <Link
          href={`https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&SearchWord=${isbn}`}
          target="_blank"
        >
          알라딘에서 구매하기
        </Link>
      </Button>
    </div>
  );
}
