import api from "./api";

export const downloadReport =
  async (
    question,
    answer,
    evaluation
  ) => {

    const response =
      await api.post(

        "/download-report",

        {

          question,
          answer,
          evaluation

        },

        {

          responseType:
            "blob"

        }

      );

    return response.data;

  };