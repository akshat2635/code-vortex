import { useState } from "react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import toast from "react-hot-toast";
import { MessageSquare } from "lucide-react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

function Comments({ snippetId }: { snippetId: Id<"snippets"> }) {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
    null
  );

  const comments =
    useQuery(api.snippets.getComments, {
      snippetId: snippetId,
    }) || [];

  const addComment = useMutation(api.snippets.addComment);
  const deleteComment = useMutation(api.snippets.deleteComment);

  const handleSubmitComment = async (content: string) => {
    setIsSubmitting(true);
    try {
      await addComment({ snippetId, content });
      toast.success("Comment added successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleDeleteComment = async (id: Id<"snippetComments">) => {
    setDeletingCommentId(id);
    try {
      await deleteComment({ commentId: id });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setDeletingCommentId(null);
    }
  };

  return (
    <div className="bg-[#121218] border border-[#ffffff0a] rounded-xl overflow-hidden">
      <div className="px-3 sm:px-4 py-3 border-b border-[#ffffff0a]">
        <h2 className="text-base font-semibold text-white flex items-center gap-1.5">
          <MessageSquare className="w-4 h-4" />
          Discussion ({comments.length})
        </h2>
      </div>

      <div className="p-3 sm:p-4">
        {user ? (
          <CommentForm
            onSubmit={handleSubmitComment}
            isSubmitting={isSubmitting}
          />
        ) : (
          <div className="bg-[#0a0a0f] rounded-lg p-4 text-center mb-5 border border-[#ffffff0a]">
            <p className="text-[#808086] mb-3 text-sm">
              Sign in to join the discussion
            </p>
            <SignInButton mode="modal">
              <button className="px-4 py-1.5 text-xs bg-[#3b82f6] text-white rounded-md hover:bg-[#2563eb] transition-colors">
                Sign In
              </button>
            </SignInButton>
          </div>
        )}

        <div className="space-y-4">
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onDelete={handleDeleteComment}
              isDeleting={deletingCommentId === comment._id}
              currentUserId={user?.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Comments;
