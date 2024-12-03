"use client";

import WordCounter from "~/_components/word-counter";
import LocaleSwitcher from "~/_components/locale-switcher";

type PageProps = {
  params: { lang: "en" | "es" };
};

export default function HomePage({ params }: PageProps) {
  return (
    <main className="h-screen max-h-screen pb-4 pt-16">
      <LocaleSwitcher lang={params.lang} />
      <WordCounter lang={params.lang} />
    </main>
  );
}
