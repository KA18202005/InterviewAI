import api from "./api";

export const matchJob = async (
  resumeText,
  jobDescription
) => {

  const token =
    localStorage.getItem("token");

  const response = await api.post(
    "/match-job",
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