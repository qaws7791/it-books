import PageContainer from "@/src/shared/components/layout/page-container";

export default function FontTestPage() {
  return (
    <PageContainer className="font-sans">
      <h2 className="text-9xl">Text 9xl</h2>
      <h2 className="text-8xl">Text 8xl</h2>
      <h2 className="text-7xl">Text 7xl</h2>
      <h2 className="text-6xl">Text 6xl</h2>
      <h2 className="text-5xl">Text 5xl</h2>
      <h2 className="text-4xl">Text 4xl</h2>
      <h2 className="text-3xl">Text 3xl</h2>
      <h2 className="text-2xl">Text 2xl</h2>
      <h2 className="text-xl">Text xl</h2>
      <h2 className="text-lg">Text lg</h2>
      <h2 className="text-base">Text base</h2>
      <h2 className="text-sm">Text sm</h2>
      <h2 className="text-xs">Text xs</h2>

      <h2 className="text-3xl font-extrabold">✅Font Extra Bold(800)</h2>
      <p className="text-3xl font-extrabold">
        다람쥐 헌 쳇바퀴에 타고파
        <br />
        The quick brown fox jumps over the lazy dog
      </p>
      <h2 className="text-3xl font-bold">✅Font Bold(700)</h2>
      <p className="text-3xl font-bold">
        다람쥐 헌 쳇바퀴에 타고파
        <br />
        The quick brown fox jumps over the lazy dog
      </p>
      <h2 className="text-3xl font-medium">✅Font Medium(500)</h2>
      <p className="text-3xl font-medium">
        다람쥐 헌 쳇바퀴에 타고파
        <br />
        The quick brown fox jumps over the lazy dog
      </p>
      <h2 className="text-3xl font-light">✅Font Light(300)</h2>
      <p className="text-3xl font-light">
        다람쥐 헌 쳇바퀴에 타고파
        <br />
        The quick brown fox jumps over the lazy dog
      </p>
    </PageContainer>
  );
}
