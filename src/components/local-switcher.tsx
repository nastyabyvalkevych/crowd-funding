"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();

  const onLanguageChange = () => {
    const nextLocale = localActive === "en" ? "ua" : "en";
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };

  return (
    <div className="white flex justify-center">
      <button
        className="bg-transparent py-2 px-4 border border-white rounded"
        onClick={onLanguageChange}
        disabled={isPending}
      >
        {localActive === "en" ? "EN" : "UA"}
      </button>
    </div>
  );
}
