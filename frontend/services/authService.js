import api from "./api";

export const loginUser = async (
  email,
  password
) => {

  const response = await api.post(
    "/login",
    {
      email,
      password,
    }
  );

  return response.data;
};

export const signupUser = async (
  name,
  email,
  password
) => {

  const response = await api.post(
    "/signup",
    {
      name,
      email,
      password,
    }
  );

  return response.data;
};