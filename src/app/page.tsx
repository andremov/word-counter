import WordCounter from "~/_components/word-counter";
import LocaleSwitcher from "~/_components/locale-switcher";

export default function HomePage() {
  return (
    <main className="h-screen max-h-screen pb-4 pt-16">
      <LocaleSwitcher />
      <WordCounter />
    </main>
  );
}
