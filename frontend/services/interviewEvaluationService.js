import api from "./api";

export const evaluateAnswer = async (
  sessionId,
  question,
  answer
) => {

  const token =
    localStorage.getItem("token");

  const response = await api.post(
    "/evaluate-answer",
    {
      session_id: sessionId,
      question,
      answer
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};