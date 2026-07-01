import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PageLayout from "../components/layout/PageLayout";
import IssueForm from "../components/issues/IssueForm";

import {
  getIssueById,
  updateIssue,
} from "../api/issues.api";

const EditIssuePage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [issue, setIssue] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadIssue();
  }, []);

  const loadIssue = async () => {
    try {
      const res = await getIssueById(Number(id));

      setIssue(res.issue || res.data);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load issue.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data: any) => {
    try {
      setSaving(true);

      await updateIssue(Number(id), data);

      toast.success("Issue updated successfully.");

      navigate("/issues");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update issue.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <PageLayout title="Edit Issue">
        <div className="bg-white rounded-xl shadow p-10 text-center">
          Loading...
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Edit Issue">
      <IssueForm
        initialData={issue}
        onSubmit={handleUpdate}
        loading={saving}
      />
    </PageLayout>
  );
};

export default EditIssuePage;