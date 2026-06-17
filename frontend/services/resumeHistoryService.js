import api from "./api";

export const getResumeHistory =
  async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await api.get(
        "/my-resumes",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
};