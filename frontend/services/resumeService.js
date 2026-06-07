import api from "./api";

export const analyzeResume = async (file) => {

  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/analyze-resume",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};