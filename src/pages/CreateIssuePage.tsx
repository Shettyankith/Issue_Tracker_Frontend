import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageLayout from "../components/layout/PageLayout";
import IssueForm from "../components/issues/IssueForm";

import { createIssue } from "../api/issues.api";

const CreateIssuePage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleCreate = async (data: any) => {
    try {
      setLoading(true);

      await createIssue(data);

      toast.success("Issue created successfully.");

      navigate("/issues");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create issue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout title="Create Issue">
      <IssueForm
        onSubmit={handleCreate}
        loading={loading}
      />
    </PageLayout>
  );
};

export default CreateIssuePage;