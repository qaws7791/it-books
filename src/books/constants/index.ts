export const BOOK_BUY_LINKS = [
  {
    site: "YES24",
    url: "https://www.yes24.com/product/search?query=",
  },
  {
    site: "교보문고",
    url: "https://search.kyobobook.co.kr/search?keyword=",
  },
  {
    site: "알라딘",
    url: "https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&SearchWord=",
  },
];

export const BOOK_STATUS_KEYS = [
  "FOR_SALE",
  "OUT_OF_PRINT",
  "UNPUBLISHED",
] as const;

export type BookStatus = (typeof BOOK_STATUS_KEYS)[number];

export const BOOK_STATUS: Record<
  (typeof BOOK_STATUS_KEYS)[number],
  { key: (typeof BOOK_STATUS_KEYS)[number]; label: string }
> = {
  FOR_SALE: {
    key: "FOR_SALE",
    label: "판매 중",
  },
  OUT_OF_PRINT: {
    key: "OUT_OF_PRINT",
    label: "절판",
  },
  UNPUBLISHED: {
    key: "UNPUBLISHED",
    label: "미발간",
  },
};
