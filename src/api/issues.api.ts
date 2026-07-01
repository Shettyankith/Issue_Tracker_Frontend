import api from "./axios";

export const getIssues = async () => {
  const res = await api.get("/issues");
  return res.data;
};

export const getIssueById = async (id: number) => {
  const res = await api.get(`/issues/${id}`);
  return res.data;
};

export const createIssue = async (payload: any) => {
  const res = await api.post("/issues", payload);
  return res.data;
};

export const updateIssue = async (
  id: number,
  payload: any
) => {
  const res = await api.put(`/issues/${id}`, payload);
  return res.data;
};

export const deleteIssue = async (id: number) => {
  const res = await api.delete(`/issues/${id}`);
  return res.data;
};