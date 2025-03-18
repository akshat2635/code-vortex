import { CodeIcon, SendIcon } from "lucide-react";
import { useState } from "react";
import CommentContent from "./CommentContent";

interface CommentFormProps {
  onSubmit: (comment: string) => Promise<void>;
  isSubmitting: boolean;
}

function CommentForm({ isSubmitting, onSubmit }: CommentFormProps) {
  const [comment, setComment] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newComment =
        comment.substring(0, start) + "  " + comment.substring(end);
      setComment(newComment);
      e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) return;

    await onSubmit(comment);

    setComment("");
    setIsPreview(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5">
      <div className="bg-[#0a0a0f] rounded-lg border border-[#ffffff0a] overflow-hidden">
        {/* Comment form header */}
        <div className="flex justify-end gap-1.5 px-3 pt-1.5">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className={`text-xs px-2 py-0.5 rounded-md transition-colors ${
              isPreview
                ? "bg-blue-500/10 text-blue-400"
                : "hover:bg-[#ffffff08] text-gray-400"
            }`}
          >
            {isPreview ? "Edit" : "Preview"}
          </button>
        </div>

        {/* Comment form body */}
        {isPreview ? (
          <div className="min-h-[100px] p-3 text-[#e1e1e3">
            <CommentContent content={comment} />
          </div>
        ) : (
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add to the discussion..."
            className="w-full bg-transparent border-0 text-[#e1e1e3] placeholder:text-[#808086] outline-none 
            resize-none min-h-[100px] p-3 font-mono text-xs"
          />
        )}

        {/* Comment Form Footer */}
        <div className="flex items-center justify-between gap-3 px-3 py-2 bg-[#080809] border-t border-[#ffffff0a]">
          <div className="hidden sm:block text-xs text-[#808086] space-y-0.5">
            <div className="flex items-center gap-1.5">
              <CodeIcon className="w-3 h-3" />
              <span className="text-[10px]">Format code with ```language</span>
            </div>
            <div className="text-[#808086]/60 pl-4 text-[10px]">
              Tab key inserts spaces • Preview comment
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !comment.trim()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3b82f6] text-white text-xs rounded-md hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed transition-all ml-auto"
          >
            {isSubmitting ? (
              <>
                <div
                  className="w-3 h-3 border-2 border-white/30 
                border-t-white rounded-full animate-spin"
                />
                <span>Posting...</span>
              </>
            ) : (
              <>
                <SendIcon className="w-3 h-3" />
                <span>Comment</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
export default CommentForm;
