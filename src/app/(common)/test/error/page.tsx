interface ErrorTestPageProps {
  searchParams: {
    error: string;
  };
}

export default function ErrorTestPage({ searchParams }: ErrorTestPageProps) {
  if (searchParams.error === "true") {
    const currentTimestamp = Date.now();
    if (currentTimestamp % 2 === 0) {
      throw new Error("Even timestamp");
    }
  }
  return <div>No error</div>;
}
