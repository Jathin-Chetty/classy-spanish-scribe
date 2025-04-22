
import React from "react";

const Header = () => (
  <header className="w-full fixed top-0 left-0 z-20 flex justify-center">
    <div className="glass-card w-[98vw] max-w-3xl mt-3 mx-2 px-6 py-3 rounded-2xl flex items-center justify-between transition-all">
      <span className="text-2xl font-extrabold tracking-wide text-gradient-primary select-none drop-shadow-[0_1px_2px_rgba(155,135,245,.23)]">
        EN<span className="opacity-60 font-thin px-1">–</span>ES&nbsp;<span className="font-black text-primary">Translator</span>
      </span>
    </div>
  </header>
);

export default Header;
