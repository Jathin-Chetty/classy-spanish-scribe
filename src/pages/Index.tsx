
import TranslatorCard from "../components/TranslatorCard";
import { Linkedin, Github } from "lucide-react";

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
      {/* Social Icons Footer */}
      <footer className="mt-10 flex flex-col items-center w-full">
        <div className="flex gap-6">
          <a
            href="https://www.linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-150 text-muted-foreground hover:text-primary"
            aria-label="LinkedIn"
          >
            <Linkedin size={28} />
          </a>
          <a
            href="https://github.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-150 text-muted-foreground hover:text-primary"
            aria-label="GitHub"
          >
            <Github size={28} />
          </a>
        </div>
        <span className="text-[0.7rem] text-muted-foreground mt-2 opacity-50">Made by jathin</span>
      </footer>
    </div>
  );
}
