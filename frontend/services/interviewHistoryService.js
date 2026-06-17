import api from "./api";

export const getInterviewHistory =
  async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await api.get(
        "/my-interviews",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
};