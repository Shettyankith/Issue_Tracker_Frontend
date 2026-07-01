import { useState } from "react";

interface Props {
  onSubmit: (body: string) => Promise<void>;
}

const CommentForm = ({ onSubmit }: Props) => {
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);

  const submit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!comment.trim()) return;

    setLoading(true);

    await onSubmit(comment);

    setComment("");

    setLoading(false);
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-4"
    >
      <textarea
        rows={4}
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
        className="w-full border rounded-lg p-4"
      />

      <button
        className="bg-blue-600 text-white rounded-lg px-5 py-3"
      >
        {loading
          ? "Posting..."
          : "Add Comment"}
      </button>
    </form>
  );
};

export default CommentForm;