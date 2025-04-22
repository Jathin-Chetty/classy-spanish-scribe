
// Modern English–Spanish Translator page

import TranslatorCard from "../components/TranslatorCard";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary to-secondary px-2 py-10">
      <TranslatorCard />
      <div className="mt-8 text-xs text-muted-foreground opacity-60 text-center">
        <span>
          Try translating sentences, phrases, and words between English and Spanish.<br />
          Open-source &middot; Fast &middot; Client-side inference
        </span>
      </div>
    </div>
  );
}

