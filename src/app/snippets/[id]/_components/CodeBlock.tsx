import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import CopyButton from "./CopyButton";

const CodeBlock = ({ language, code }: { language: string; code: string }) => {
  const trimmedCode = code
    .split("\n") // split into lines
    .map((line) => line.trimEnd()) // remove trailing spaces from each line
    .join("\n"); // join back into a single string

  return (
    <div className="my-3 bg-[#0a0a0f] rounded-md overflow-hidden border border-[#ffffff0a]">
      {/* header bar showing language and copy button */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#ffffff08]">
        {/* language indicator with icon */}
        <div className="flex items-center gap-1.5">
          <img
            src={`/${language}.png`}
            alt={language}
            className="size-3.5 object-contain"
          />
          <span className="text-xs text-gray-400">
            {language || "plaintext"}
          </span>
        </div>
        {/* button to copy code to clipboard */}
        <CopyButton code={trimmedCode} />
      </div>

      {/* code block with syntax highlighting */}
      <div className="relative">
        <SyntaxHighlighter
          language={language || "plaintext"}
          style={atomOneDark} // dark theme for the code
          customStyle={{
            padding: "0.75rem",
            background: "transparent",
            margin: 0,
            fontSize: "0.85rem",
          }}
          showLineNumbers={true}
          wrapLines={true} // wrap long lines
        >
          {trimmedCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
