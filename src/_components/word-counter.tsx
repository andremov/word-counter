"use client";

import { useState, useEffect, useCallback, Fragment } from "react";
import { Check, Copy } from "lucide-react";
import locale from "~/utils/locale.json";
import type LocaleStrings from "~/utils/types";
import clsx from "clsx";
import Header from "./header";

const debounce = (func: (arg: string) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (arg: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(arg), delay);
  };
};

export default function WordCounter({ lang = "en" }: { lang?: "en" | "es" }) {
  const [input, setInput] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const localeStrings = locale[lang] as LocaleStrings;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const formatJSON = useCallback(
    debounce((value: string) => {
      if (!value.trim()) {
        setWordCount(0);
        setCharacterCount(0);
        return;
      }

      const words = value.trim().split(/\s+/).filter(Boolean).length;
      const characters = value.replace(/\s/g, "").length;
      setWordCount(words);
      setCharacterCount(characters);
    }, 300),
    [],
  );

  useEffect(() => {
    formatJSON(input);
  }, [input, formatJSON]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(input);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="container mx-auto flex h-full flex-col">
      <Header lang={lang} />

      <div className={clsx(["flex flex-1 gap-4"])}>
        <div className={clsx(["flex w-full flex-col gap-2"])}>
          <div className="flex h-10 items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-200">
              {localeStrings.labels.input}
            </h2>
            <button
              onClick={handleCopy}
              className={clsx([
                "flex items-center gap-2 rounded-md border border-gray-600 bg-gray-800 px-2 py-1 text-gray-200 outline-none transition hover:bg-gray-700",
                {
                  "bg-green-600 text-white": isCopied,
                },
              ])}
            >
              {isCopied ? (
                <Fragment>
                  <Check className="h-4 w-4" />
                  <span>{localeStrings.buttons.copied}</span>
                </Fragment>
              ) : (
                <Fragment>
                  <Copy className="h-4 w-4" />
                  <span>{localeStrings.buttons.copy}</span>
                </Fragment>
              )}
            </button>
          </div>
          <textarea
            placeholder={localeStrings.labels.data}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full flex-1 resize-none rounded-md border border-gray-600 bg-gray-800 p-4 text-gray-200 placeholder-gray-400 outline-none transition focus:border-blue-400"
          />
          <div className="text-gray-300">
            {characterCount} {localeStrings.labels.chars}. {wordCount}{" "}
            {localeStrings.labels.words}.
          </div>
        </div>
      </div>
    </div>
  );
}
