import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full px-8 py-8 pt-16 flex flex-col items-center justify-start gap-4 md:justify-between border-t-4 border-double border-outline/40 md:flex-row ">
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <Image src="/logo.svg" alt="logo" width={160} height={40} />

        <div className="flex gap-4">
          <Link href="/books" className="hover:underline">
            책 찾기
          </Link>
          <Link href="/lists" className="hover:underline">
            리스트 찾기
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/terms" className="hover:underline">
          서비스 이용약관
        </Link>
        <Link href="/privacy" className="hover:underline">
          개인정보 처리방침
        </Link>
      </div>
    </footer>
  );
}
