
import React, { useState, useRef } from "react";
import { Translate } from "lucide-react";

const DEFAULT_PLACEHOLDER = "Type your English text here...";

// We'll lazy-load the translation model only when needed
let translatorPipeline: any = null;

async function loadTranslator() {
  if (!translatorPipeline) {
    const { pipeline } = await import("@huggingface/transformers");
    // Helsinki-NLP/opus-mt-en-es is small and fast for English-Spanish
    translatorPipeline = await pipeline(
      "translation",
      "Xenova/opus-mt-en-es",
      { quantized: true, progress_callback: (status: any) => {
        // Could show progress
      }}
    );
  }
  return translatorPipeline;
}

export default function TranslatorCard() {
  const [english, setEnglish] = useState("");
  const [spanish, setSpanish] = useState("");
  const [loading, setLoading] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastInputRef = useRef<string>("");

  const handleTranslate = async () => {
    setError(null);
    setLoading(true);
    setSpanish("");
    try {
      setModelLoading(true);
      const model = await loadTranslator();
      setModelLoading(false);

      // If the user quickly clears or changes input, don't translate
      lastInputRef.current = english;
      const output = await model(english, { max_length: 100 });
      // Defensive: check if input changed since request started
      if (lastInputRef.current !== english) return;
      setSpanish(output[0]?.translation_text || "No translation found.");
      setLoading(false);
    } catch (e: any) {
      setError("Model failed to translate. Try again or rephrase.");
      setLoading(false);
      setModelLoading(false);
    }
  };

  // Press 'Enter' for translate, unless shift is held
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (english.trim().length > 0 && !loading) {
        handleTranslate();
      }
    }
  };

  return (
    <div className="max-w-2xl w-full rounded-xl shadow-smooth bg-card p-8 mx-auto">
      <div className="flex gap-3 mb-6 items-center">
        <span className="rounded-lg bg-primary/10 px-3 py-1.5 font-semibold text-primary tracking-wide text-xs flex items-center gap-0.5">
          <Translate size={18} className="mr-1" />
          English → Spanish
        </span>
      </div>
      <label className="block mb-1.5 font-medium text-sm text-muted-foreground" htmlFor="english-input">
        English
      </label>
      <textarea
        id="english-input"
        className="w-full h-28 rounded-xl border border-muted bg-muted px-4 py-3 resize-none font-sans text-lg focus:outline-none focus:ring-2 ring-primary/30 mb-4 transition"
        value={english}
        disabled={loading || modelLoading}
        onChange={e => setEnglish(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={DEFAULT_PLACEHOLDER}
        maxLength={400}
        autoFocus
      />
      <button
        className="w-full mt-1 py-3 bg-primary hover:bg-primary/90 active:bg-primary/80 text-white text-lg rounded-xl font-semibold transition disabled:opacity-70 disabled:cursor-not-allowed mb-6 flex items-center justify-center gap-2"
        onClick={handleTranslate}
        disabled={!english.trim() || loading || modelLoading}
      >
        {loading || modelLoading ? (
          <>
            <span className="animate-spin mr-2 w-5 h-5 border-2 border-white border-t-primary rounded-full inline-block" /> 
            {modelLoading ? "Loading model..." : "Translating..."}
          </>
        ) : (
          <>
            <Translate size={20} />
            Translate
          </>
        )}
      </button>

      <label className="block mb-1 font-medium text-sm text-muted-foreground" htmlFor="spanish-output">
        Spanish
      </label>
      <div
        id="spanish-output"
        className={`min-h-[54px] w-full rounded-xl border border-muted bg-secondary px-4 py-3 mb-2 font-sans text-lg text-gray-800 transition whitespace-pre-line ${
          loading || modelLoading ? "opacity-60" : ""
        }`}
        style={{ minHeight: 54 }}
      >
        {spanish &&
          <span className="font-semibold text-primary block">{spanish}</span>
        }
        {!spanish && !loading && !modelLoading &&
          <span className="text-gray-400">Translation will appear here...</span>
        }
      </div>
      {error && (
        <div className="text-red-500 mt-2 text-sm">{error}</div>
      )}
      <div className="flex justify-end">
        <span className="text-xs text-muted-foreground italic mt-2">
          Powered by HuggingFace Transformers
        </span>
      </div>
    </div>
  );
}
