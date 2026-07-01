import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import StatusBadge from "./StatusBadge";
import type { Issue } from "../../types/issue";

interface Props {
  issues: Issue[];
  onDelete: (id: number) => void;
}

const IssueList = ({ issues, onDelete }: Props) => {
  if (!issues.length) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
        No issues found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left p-4">Title</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Assigned</th>
            <th className="text-left p-4">Created</th>
            <th className="text-center p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {issues.map((issue) => (
            <tr
              key={issue.id}
              className="border-t hover:bg-slate-50"
            >
              <td className="p-4 font-medium">
                {issue.title}
              </td>

              <td className="p-4">
                <StatusBadge status={issue.status} />
              </td>

              <td className="p-4">
                {issue.assignee_name ?? "-"}
              </td>

              <td className="p-4">
                {new Date(issue.created_at).toLocaleDateString()}
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-3">

                  <Link
                    to={`/issues/${issue.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEye />
                  </Link>

                  <Link
                    to={`/issues/edit/${issue.id}`}
                    className="text-green-600 hover:text-green-800"
                  >
                    <FaEdit />
                  </Link>

                  <button
                    onClick={() => onDelete(issue.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssueList;