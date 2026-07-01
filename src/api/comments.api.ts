import api from "./axios";

export const getComments = async (issueId: number) => {
  const res = await api.get(`/comments/${issueId}`);
  return res.data;
};

export const addComment = async (
  issueId: number,
  body: string
) => {
  try{
    const res = await api.post(`/comments/${issueId}`, {
      issue_id: issueId,
      body,
    });
  
    return res.data;
  }catch(e){
    console.log("Error thrown is ",e)
  }
};