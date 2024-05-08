import Page from "@/src/shared/components/layout/Page";

export default function FontTestPage() {
  return (
    <Page className="font-sans">
      <h1 className="text-9xl">Text 9xl</h1>
      <h1 className="text-8xl">Text 8xl</h1>
      <h1 className="text-7xl">Text 7xl</h1>
      <h1 className="text-6xl">Text 6xl</h1>
      <h1 className="text-5xl">Text 5xl</h1>
      <h1 className="text-4xl">Text 4xl</h1>
      <h1 className="text-3xl">Text 3xl</h1>
      <h1 className="text-2xl">Text 2xl</h1>
      <h1 className="text-xl">Text xl</h1>
      <h1 className="text-lg">Text lg</h1>
      <h1 className="text-base">Text base</h1>
      <h1 className="text-sm">Text sm</h1>
      <h1 className="text-xs">Text xs</h1>

      <h1 className="text-3xl font-black">Font Black</h1>
      <h1 className="text-3xl font-extrabold">Font Extra Bold</h1>
      <h1 className="text-3xl font-bold">Font Bold</h1>
      <h1 className="text-3xl font-semibold">Font Semi Bold</h1>
      <h1 className="text-3xl font-medium">Font Medium</h1>
      <h1 className="text-3xl font-normal">Font Normal</h1>
      <h1 className="text-3xl font-light">Font Light</h1>
      <h1 className="text-3xl font-extralight">Font Extra Light</h1>
      <h1 className="text-3xl font-thin">Font Thin</h1>
    </Page>
  );
}
