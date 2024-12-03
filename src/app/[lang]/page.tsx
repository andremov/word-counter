import WordCounter from "~/_components/word-counter";
import LocaleSwitcher from "~/_components/locale-switcher";

type PageProps = {
  params: Promise<{ lang: "en" | "es" }>;
};

export default async function HomePage({ params }: PageProps) {
  const lang = (await params).lang;

  return (
    <main className="h-screen max-h-screen pb-4 pt-16">
      <LocaleSwitcher lang={lang} />
      <WordCounter lang={lang} />
    </main>
  );
}
