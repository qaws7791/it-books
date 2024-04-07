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

const BOOKS = [
  {
    id: 1,
    title: "견고한 데이터 엔지니어링",
    slug: "견고한-데이터-엔지니어링",
    category: "빅데이터",
    description: " 데이터 파이프라인 설계와 구축의 핵심 원칙",
    author: "조 라이스, 맷 하우슬리",
    publisher: "한빛미디어",
    publishDate: "2023-06-26",
    translator: "김인범",
    isbn: "9791169211222",
    picture: "https://image.yes24.com/goods/119712582/XL",
    likes: 10,
    tags: ["데이터 엔지니어링", "빅데이터", "데이터 파이프라인"],
  },
  {
    id: 2,
    title: "NGINX 쿡북",
    slug: "NGINX-쿡북",
    category: "네트워크",
    description:
      "115가지 레시피로 배우는 고성능 부하분산, 보안, 서버 배포와 관리",
    author: "데릭 디용기",
    publisher: "한빛미디어",
    publishDate: "2022-12-20",
    translator: "노승헌",
    isbn: "9791169210614",
    picture: "https://image.yes24.com/goods/116438200/XL",
    likes: 30,
    tags: ["NGINX", "웹 서버", "리버스 프록시"],
  },
  {
    id: 3,
    title: "러닝 타입스크립트",
    slug: "러닝-타입스크립트",
    category: "웹 개발",
    description: "안정적인 웹 프로젝트 운영을 위한 타입스크립트의 모든 것",
    author: "조시 골드버그",
    publisher: "한빛미디어",
    publishDate: "2022-12-20",
    translator: "고승원",
    isbn: "9791169210638",
    picture: "https://image.yes24.com/goods/116585556/XL",
    likes: 4,
    tags: ["타입스크립트", "웹 개발", "자바스크립트", "프론트엔드"],
  },
  {
    id: 4,
    title: "소프트웨어 아키텍처 101",
    slug: "소프트웨어-아키텍처-101",
    category: "소프트웨어 공학",
    description: "엔지니어링 접근 방식으로 배우는 소프트웨어 아키텍처 기초",
    author: "마크 리처즈, 닐 포드",
    publisher: "한빛미디어",
    publishDate: "2021-11-01",
    translator: "이일웅",
    isbn: "9791162244869",
    picture: "https://image.yes24.com/goods/104491433/XL",
    likes: 4,
    tags: ["소프트웨어 아키텍처", "소프트웨어 공학", "시스템 디자인"],
  },
  {
    id: 5,
    title: "러닝 리액트",
    slug: "러닝-리액트",
    category: "웹 개발",
    description: "최적의 리액트 코드를 작성하기 위한 모범 사례와 패턴",
    author: "알렉스 뱅크스, 이브 포셀로",
    publisher: "한빛미디어",
    publishDate: "2021-07-01",
    translator: "오현석",
    isbn: "9791162244494",
    picture: "https://image.yes24.com/goods/102277805/XL",
    likes: 546,
    tags: ["리액트", "프론트엔드", "자바스크립트", "웹 개발"],
  },
];

const DUMMY = {
  CATEGORIES,
  SIDEBAR_LINKS,
  BOOKS,
  ADMIN_SIDEBAR_LINKS,
};

export default DUMMY;
