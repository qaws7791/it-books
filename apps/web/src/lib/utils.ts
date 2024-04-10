import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function toKoreanDateString(date: string): string {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
