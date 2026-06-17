import api from "./api";

export const generateRoadmap = async (
  resumeText,
  targetRole
) => {

  const token =
    localStorage.getItem("token");

  const response =
    await api.post(
      "/generate-roadmap",
      {
        resume_text: resumeText,
        target_role: targetRole
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