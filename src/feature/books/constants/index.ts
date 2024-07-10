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

export type SortOption = {
  label: string;
  value: string;
  orderBy: "createdAt" | "publishedDate" | "pages";
  order: "ASC" | "DESC";
  iconName: string;
  default: boolean;
};

export const sortOptions: Record<string, SortOption> = {
  latest: {
    label: "최신순",
    value: "latest",
    orderBy: "createdAt",
    order: "DESC",
    iconName: "sort",
    default: true,
  },
  publishedAt: {
    label: "출간일순",
    value: "publishedAt",
    orderBy: "publishedDate",
    order: "DESC",
    iconName: "calendar_today",
    default: false,
  },
  pageLow: {
    label: "페이지 적은 순",
    value: "pageLow",
    orderBy: "pages",
    order: "ASC",
    iconName: "format_list_numbered",
    default: false,
  },
};

export const sortOptionArray = Object.values(sortOptions);
