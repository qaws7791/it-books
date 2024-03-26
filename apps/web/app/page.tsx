interface HomeProps {
  searchParams: {
    id: string;
  };
}

export default async function Home(props: HomeProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">User</h1>
      <div className="flex flex-col items-center"></div>
    </main>
  );
}
