import api from "./api";

export const startInterview = async (
  resumeText,
  jobDescription
) => {

  const token =
    localStorage.getItem("token");

  const response = await api.post(
    "/start-interview",
    {
      resume_text: resumeText,
      job_description: jobDescription
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};