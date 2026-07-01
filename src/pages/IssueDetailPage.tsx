import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaUser, FaCalendarAlt } from "react-icons/fa";
import PageLayout from "../components/layout/PageLayout";
import StatusBadge from "../components/issues/StatusBadge";
import { getIssueById } from "../api/issues.api";
import { addComment, getComments } from "../api/comments.api";
import CommentForm from "../components/comments/CommentForm";
import CommentList from "../components/comments/CommentList";

const IssueDetailPage = () => {
  const { id } = useParams();

  const [issue, setIssue] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] =
  useState([]);

const loadComments = async () => {
  const res = await getComments(
    Number(id)
  );

  setComments(
    res.comments || res.data
  );
};
  useEffect(() => {
    loadIssue();
    loadComments();
  }, [id]);

  const loadIssue = async () => {
    try {
      const res = await getIssueById(Number(id));

      setIssue(res.issue || res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleComment = async (
    body: string
  ) => {
    await addComment(
      Number(id),
      body
    );
  
    await loadComments();
  };

  if (loading) {
    return (
      <PageLayout title="Issue Details">
        <div className="bg-white rounded-xl shadow p-8 text-center">
          Loading...
        </div>
      </PageLayout>
    );
  }

  if (!issue) {
    return (
      <PageLayout title="Issue Details">
        <div className="bg-white rounded-xl shadow p-8 text-center">
          Issue not found.
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Issue Details">

      <div className="bg-white rounded-xl shadow-md p-8">

        <div className="flex justify-between items-start mb-8">

          <div>

            <h1 className="text-3xl font-bold mb-3">
              {issue.title}
            </h1>

            <StatusBadge status={issue.status} />

          </div>

          <Link
            to={`/issues/edit/${issue.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-3 flex items-center gap-2"
          >
            <FaEdit />

            Edit
          </Link>

        </div>

        <div className="mb-8">

          <h2 className="font-semibold text-lg mb-3">
            Description
          </h2>

          <div className="bg-slate-50 border rounded-lg p-5 leading-7">
            {issue.description}
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-slate-50 rounded-lg p-5 border">

            <div className="flex items-center gap-3 mb-3">

              <FaUser className="text-blue-600" />

              <span className="font-semibold">
                Assigned User
              </span>

            </div>

            <p className="text-gray-700">
              {issue.assigned_user?.name ||
                issue.assigned_to ||
                "Not Assigned"}
            </p>

          </div>

          <div className="bg-slate-50 rounded-lg p-5 border">

            <div className="flex items-center gap-3 mb-3">

              <FaCalendarAlt className="text-green-600" />

              <span className="font-semibold">
                Created At
              </span>

            </div>

            <p className="text-gray-700">
              {new Date(
                issue.created_at
              ).toLocaleString()}
            </p>

          </div>

        </div>

      </div>

      <div className="bg-white rounded-xl shadow-md mt-8 p-8">

        <h2 className="text-2xl font-semibold mb-6">
          Comments
        </h2>

        <div className="bg-white rounded-xl shadow mt-8 p-8">

  <h2 className="text-2xl font-semibold mb-6">
    Comments
  </h2>

  <CommentForm
    onSubmit={handleComment}
  />

  <div className="mt-8">

    <CommentList
      comments={comments}
    />

  </div>

</div>

      </div>

      <div className="mt-8">

        <Link
          to="/issues"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <FaArrowLeft />

          Back to Issues
        </Link>

      </div>

    </PageLayout>
  );
};

export default IssueDetailPage;