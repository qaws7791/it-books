import QueryString from "@/src/feature/shared/utils/querystring";

interface QueryStringTestPageProps {
  searchParams: {
    [key: string]: string;
  };
}

export default function QueryStringTestPage({
  searchParams,
}: QueryStringTestPageProps) {
  console.log("searchParams", searchParams);
  const page = QueryString.toNumber(searchParams.page);
  console.log(page);
  return (
    <div>
      <h1 className="sr-only">Query String Test Page</h1>
      <p className="text-2xl my-4 text-center">Query String Test Page</p>
      <pre>{JSON.stringify(searchParams, null, 2)}</pre>
      <p>{searchParams.query}</p>
    </div>
  );
}
