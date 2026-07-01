import api from "./axios";

export const getDashboardStats = async () => {
  console.log("here")
  const response = await api.get("/dashboard/stats");
  return response.data.data;
};