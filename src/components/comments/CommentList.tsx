import type { Comment } from "../../types/comments";

interface Props {
  comments: Comment[];
}

const CommentList = ({
  comments,
}: Props) => {
  if (!comments.length) {
    return (
      <p className="text-gray-500">
        No comments yet.
      </p>
    );
  }

  return (
    <div className="space-y-5">

      {comments.map((comment) => (

        <div
          key={comment.id}
          className="border rounded-lg p-5 bg-slate-50"
        >

          <div className="flex justify-between">

            <h4 className="font-semibold">
              {comment.user?.name}
            </h4>

            <span className="text-sm text-gray-500">
              {new Date(
                comment.created_at
              ).toLocaleString()}
            </span>

          </div>

          <p className="mt-3">
            {comment.body}
          </p>

        </div>

      ))}

    </div>
  );
};

export default CommentList;