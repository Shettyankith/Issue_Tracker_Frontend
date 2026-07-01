import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import PageLayout from "../components/layout/PageLayout";
import IssueList from "../components/issues/IssueList";

import {
  deleteIssue,
  getIssues,
} from "../api/issues.api";

import type { Issue } from "../types/issue";

const IssueListPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    try {
      const data = await getIssues();

      setIssues(data.issues || data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Delete this issue?"
    );

    if (!confirmDelete) return;

    try {
      await deleteIssue(id);

      setIssues((prev) =>
        prev.filter((issue) => issue.id !== id)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to delete issue.");
    }
  };

  return (
    <PageLayout title="Issue Management">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-xl font-semibold">
            All Issues
          </h2>

          <p className="text-gray-500">
            Manage all project issues.
          </p>
        </div>

        <Link
          to="/issues/new"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-3 flex items-center gap-2"
        >
          <FaPlus />

          Create Issue
        </Link>

      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          Loading...
        </div>
      ) : (
        <IssueList
          issues={issues}
          onDelete={handleDelete}
        />
      )}

    </PageLayout>
  );
};

export default IssueListPage;