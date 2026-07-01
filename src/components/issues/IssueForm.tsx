import { useEffect, useState } from "react";
import { getUsers } from "../../api/users.api";

interface User {
  id: number;
  name: string;
}

interface Props {
  initialData?: {
    title: string;
    description: string;
    status: string;
    assigned_to: number | null;
  };

  onSubmit: (data: any) => Promise<void>;

  loading?: boolean;
}

const IssueForm = ({
  initialData,
  onSubmit,
  loading = false,
}: Props) => {
  const [title, setTitle] = useState(
    initialData?.title || ""
  );

  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const [status, setStatus] = useState(
    initialData?.status || "Open"
  );

  const [assignedTo, setAssignedTo] = useState<
    number | ""
  >(initialData?.assigned_to ?? "");

  const [users, setUsers] = useState<User[]>([]);

  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getUsers();

      setUsers(res.users || res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const submit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!description.trim()) {
      setError("Description is required.");
      return;
    }

    setError("");

    await onSubmit({
      title,
      description,
      status,
      assigned_to:
        assignedTo === "" ? null : Number(assignedTo),
    });
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white rounded-xl shadow p-8 space-y-6"
    >
      {error && (
        <div className="bg-red-100 text-red-600 rounded p-3">
          {error}
        </div>
      )}

      <div>
        <label className="block mb-2 font-medium">
          Title
        </label>

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Issue title"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Description
        </label>

        <textarea
          rows={5}
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Describe the issue..."
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block mb-2 font-medium">
            Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Closed</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Assign User
          </label>

          <select
            value={assignedTo}
            onChange={(e) =>
              setAssignedTo(
                e.target.value
                  ? Number(e.target.value)
                  : ""
              )
            }
            className="w-full border rounded-lg p-3"
          >
            <option value="">
              Select User
            </option>

            {users.map((user) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg px-6 py-3"
      >
        {loading
          ? "Saving..."
          : initialData
          ? "Update Issue"
          : "Create Issue"}
      </button>
    </form>
  );
};

export default IssueForm;