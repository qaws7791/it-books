import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full px-8 py-8 pt-24 flex items-center justify-between gap-4">
      <div className="flex items-center gap-8">
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
      <div className="flex gap-4">
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
