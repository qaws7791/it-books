"use client";
import Button from "@/src/ui/components/button";
import { toast } from "sonner";

interface ShareButtonProperties {
  url: string;
}

export default function ShareButton({ url }: ShareButtonProperties) {
  const handleClick = async () => {
    await navigator.clipboard.writeText(url);
    toast.info("클립보드에 복사되었습니다.");
  };

  return (
    <Button variant="outline" onClick={handleClick} aria-label="Share">
      공유하기
      <span className="material-icons text-xl">share</span>
    </Button>
  );
}
