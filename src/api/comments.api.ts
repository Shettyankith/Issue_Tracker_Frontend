import api from "./axios";

export const getComments = async (issueId: number) => {
  const res = await api.get(`/comments/${issueId}`);
  return res.data;
};

export const addComment = async (
  issueId: number,
  body: string
) => {
  const res = await api.post("/comments", {
    issue_id: issueId,
    body,
  });

  return res.data;
};