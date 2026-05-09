import api from "./api";

export const login = async (data: any) => {
  const formData = new URLSearchParams();

  formData.append("Username", data.username);
  formData.append("PasswordHash", data.passwordHash);

  const response = await api.post("/auth", formData);
  return response.data;
};