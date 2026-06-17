import api from "./api";

export const generateCoverLetter =
  async (
    resumeText,
    jobDescription
  ) => {

    const token =
      localStorage.getItem("token");

    const response =
      await api.post(
        "/generate-cover-letter",
        {
          resume_text: resumeText,
          job_description:
            jobDescription
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
};