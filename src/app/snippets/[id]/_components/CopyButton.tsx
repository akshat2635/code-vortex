"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

function CopyButton({ code }: { code: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={copyToClipboard}
      className="p-1.5 hover:bg-white/10 rounded-md transition-all duration-200 group relative"
    >
      {isCopied ? (
        <Check className="w-3.5 h-3.5 text-green-400" />
      ) : (
        <Copy className="size-3.5 text-gray-400 group-hover:text-gray-300" />
      )}
    </button>
  );
}

export default CopyButton;
