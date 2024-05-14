import { BookDetail } from "@/src/books/types";

const CATEGORIES = [
  {
    id: 1,
    name: "Category 1",
    slug: "category-1",
  },
  {
    id: 2,
    name: "Category 2",
    slug: "category-2",
  },
  {
    id: 3,
    name: "Category 3",
    slug: "category-3",
  },
  {
    id: 4,
    name: "Category 4",
    slug: "category-4",
  },
  {
    id: 5,
    name: "Category 5",
    slug: "category-5",
  },
  {
    id: 6,
    name: "Category 6",
    slug: "category-6",
  },
  {
    id: 7,
    name: "Category 7",
    slug: "category-7",
  },
  {
    id: 8,
    name: "Category 8",
    slug: "category-8",
  },
  {
    id: 9,
    name: "Category 9",
    slug: "category-9",
  },
  {
    id: 10,
    name: "Category 10",
    slug: "category-10",
  },
];

const SIDEBAR_LINKS = [
  {
    id: 1,
    name: "책 찾기",
    href: "/books",
  },
  {
    id: 2,
    name: "컬렉션 찾기",
    href: "/collections",
  },
];

const ADMIN_SIDEBAR_LINKS = [
  {
    id: 1,
    name: "대시보드",
    href: "/admin/dashboard",
  },
  {
    id: 2,
    name: "카테고리 관리",
    href: "/admin/categories",
  },
  {
    id: 3,
    name: "도서 관리",
    href: "/admin/books",
  },
];

const BOOKS: BookDetail[] = [
  {
    id: 1,
    title: "견고한 데이터 엔지니어링",
    slug: "견고한-데이터-엔지니어링",
    category: {
      id: 1,
      name: "데이터 엔지니어링",
      createdAt: "2023-06-26",
      updatedAt: "2023-06-26",
    },
    description: " 데이터 파이프라인 설계와 구축의 핵심 원칙",
    authors: ["조 라이스", "맷 하우슬리"],
    publisher: "한빛미디어",
    publishedDate: "2023-06-26",
    translator: ["김인범"],
    isbn: "9791169211222",
    coverImage: "https://image.yes24.com/goods/119712582/XL",
    tags: [
      {
        id: 1,
        name: "데이터 엔지니어링",
      },
      {
        id: 2,
        name: "데이터 파이프라인",
      },
      {
        id: 3,
        name: "빅데이터",
      },
    ],
    createdAt: "2023-06-26",
    updatedAt: "2023-06-26",
  },
  {
    id: 2,
    title: "NGINX 쿡북",
    slug: "NGINX-쿡북",
    category: {
      id: 2,
      name: "웹 서버",
      createdAt: "2022-12-20",
      updatedAt: "2022-12-20",
    },
    description:
      "115가지 레시피로 배우는 고성능 부하분산, 보안, 서버 배포와 관리",
    authors: ["데릭 디용기"],
    publisher: "한빛미디어",
    publishedDate: "2022-12-20",
    translator: ["노승헌"],
    isbn: "9791169210614",
    coverImage: "https://image.yes24.com/goods/116438200/XL",
    tags: [
      {
        id: 4,
        name: "웹 서버",
      },
      {
        id: 5,
        name: "NGINX",
      },
      {
        id: 6,
        name: "운영체제",
      },
    ],
    updatedAt: "2022-12-20",
    createdAt: "2022-12-20",
  },
  {
    id: 3,
    title: "러닝 타입스크립트",
    slug: "러닝-타입스크립트",
    category: {
      id: 3,
      name: "타입스크립트",
      createdAt: "2022-12-20",
      updatedAt: "2022-12-20",
    },
    description: "안정적인 웹 프로젝트 운영을 위한 타입스크립트의 모든 것",
    authors: ["조시 골드버그"],
    publisher: "한빛미디어",
    publishedDate: "2022-12-20",
    translator: ["고승원"],
    isbn: "9791169210638",
    coverImage: "https://image.yes24.com/goods/116585556/XL",
    tags: [
      {
        id: 7,
        name: "타입스크립트",
      },
      {
        id: 8,
        name: "자바스크립트",
      },
      {
        id: 9,
        name: "프론트엔드",
      },
    ],
    updatedAt: "2022-12-20",
    createdAt: "2022-12-20",
  },
  {
    id: 4,
    title: "소프트웨어 아키텍처 101",
    slug: "소프트웨어-아키텍처-101",
    category: {
      id: 4,
      name: "소프트웨어 아키텍처",
      createdAt: "2021-11-01",
      updatedAt: "2021-11-01",
    },
    description: "엔지니어링 접근 방식으로 배우는 소프트웨어 아키텍처 기초",
    authors: ["마크 리처즈", "닐 포드"],
    publisher: "한빛미디어",
    publishedDate: "2021-11-01",
    translator: ["이일웅"],
    isbn: "9791162244869",
    coverImage: "https://image.yes24.com/goods/104491433/XL",
    tags: [
      {
        id: 10,
        name: "소프트웨어 아키텍처",
      },
      {
        id: 11,
        name: "소프트웨어 엔지니어링",
      },
      {
        id: 12,
        name: "시스템 아키텍처",
      },
    ],
    updatedAt: "2021-11-01",
    createdAt: "2021-11-01",
  },
  {
    id: 5,
    title: "러닝 리액트",
    slug: "러닝-리액트",
    category: {
      id: 5,
      name: "리액트",
      createdAt: "2021-07-01",
      updatedAt: "2021-07-01",
    },
    description: "최적의 리액트 코드를 작성하기 위한 모범 사례와 패턴",
    authors: ["알렉스 뱅크스", " 이브 포셀로"],
    publisher: "한빛미디어",
    publishedDate: "2021-07-01",
    translator: ["오현석"],
    isbn: "9791162244494",
    coverImage: "https://image.yes24.com/goods/102277805/XL",
    tags: [
      {
        id: 13,
        name: "리액트",
      },
      {
        id: 14,
        name: "프론트엔드",
      },
      {
        id: 15,
        name: "자바스크립트",
      },
    ],
    updatedAt: "2021-07-01",
    createdAt: "2021-07-01",
  },
];

const LISTS = [
  {
    id: 1,
    name: "최신 도서",
    slug: "최신-도서",
    description: "최신 출간된 도서들을 만나보세요.",
    books: BOOKS.slice(0, 3),
    count: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "인기 도서",
    slug: "인기-도서",
    description: "많은 사람들이 읽고 있는 인기 도서들입니다.",
    books: BOOKS.slice(3, 5),
    count: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const LiST_DETAILS = [
  {
    id: 1,
    name: "최신 도서",
    slug: "최신-도서",
    description: "최신 출간된 도서들을 만나보세요.",
    books: BOOKS.slice(0, 5),
    count: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "인기 도서",
    slug: "인기-도서",
    description: "많은 사람들이 읽고 있는 인기 도서들입니다.",
    books: BOOKS.slice(3, 5),
    count: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const DUMMY = {
  CATEGORIES,
  SIDEBAR_LINKS,
  BOOKS,
  ADMIN_SIDEBAR_LINKS,
  LISTS,
  LiST_DETAILS,
};

export default DUMMY;
