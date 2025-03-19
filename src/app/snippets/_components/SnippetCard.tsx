"use client";
import { Snippet } from "@/types";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Trash2, User } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import StarButton from "@/components/StarButton";

function SnippetCard({ snippet }: { snippet: Snippet }) {
  const { user } = useUser();
  const deleteSnippet = useMutation(api.snippets.deleteSnippet);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteSnippet({ snippetId: snippet._id });
      toast.success("Snippet deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete snippet");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      layout
      className="group relative"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/snippets/${snippet._id}`} className="h-full block">
        <div
          className="relative h-full bg-[#1e1e2e]/80 backdrop-blur-sm rounded-lg 
          border border-[#313244]/50 hover:border-[#313244] 
          transition-all duration-300 overflow-hidden"
        >
          <div className="p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md blur opacity-20 
                  group-hover:opacity-30 transition-all duration-500"
                    area-hidden="true"
                  />
                  <div
                    className="relative p-1.5 rounded-md bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20
                   group-hover:to-purple-500/20 transition-all duration-500"
                  >
                    <Image
                      src={`/${snippet.language}.png`}
                      alt={`${snippet.language} logo`}
                      className="w-5 h-5 object-contain relative z-10"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-md text-xs font-medium">
                    {snippet.language}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock className="size-2.5" />
                    {new Date(snippet._creationTime).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div
                className="absolute top-4 right-4 z-10 flex gap-3 items-center"
                onClick={(e) => e.preventDefault()}
              >
                <StarButton snippetId={snippet._id} />

                {user?.id === snippet.userId && (
                  <div className="z-10" onClick={(e) => e.preventDefault()}>
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className={`group flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-200
                                  ${
                                    isDeleting
                                      ? "bg-red-500/20 text-red-400 cursor-not-allowed"
                                      : "bg-gray-500/10 text-gray-400 hover:bg-red-500/10 hover:text-red-400"
                                  }
                                `}
                    >
                      {isDeleting ? (
                        <div className="size-3 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="size-3" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <div>
                <h2 className="text-lg font-semibold text-white mb-1.5 line-clamp-1 group-hover:text-blue-400 transition-colors">
                  {snippet.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <div className="p-0.5 rounded-md bg-gray-800/50">
                      <User className="size-2.5" />
                    </div>
                    <span className="truncate max-w-[130px]">
                      {snippet.userName ? snippet.userName : "Anonymous"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative group/code">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 to-purple-500/5 rounded-md opacity-0 group-hover/code:opacity-100 transition-all" />
                <pre className="relative bg-black/30 rounded-md p-3 overflow-hidden text-xs text-gray-300 font-mono line-clamp-3">
                  {snippet.code}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default SnippetCard;
