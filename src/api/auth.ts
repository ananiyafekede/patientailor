import { LoginProps, RegisterProps, User } from "@/types";
import axios, { AxiosError } from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const handleError = (error: AxiosError) => {
  if (error.response) {
    throw Error(
      (error.response.data as { message: string }).message ||
        "An error occurred"
    );
  } else if (error.request) {
    throw Error("No response from the server");
  } else {
    throw Error(error.message);
  }
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export async function login(data: LoginProps): Promise<User> {
  try {
    const res = await api.post("/auth/login", data);

    return res.data.data.user;
  } catch (error) {
    return handleError(error);
  }
}

export async function register(data: RegisterProps): Promise<User> {
  try {
    const res = await api.post("/auth/register", data);

    return res.data.data.user;
  } catch (error) {
    return handleError(error);
  }
}

export async function logout(): Promise<{ message: string }> {
  try {
    const res = await api.post(`/auth/logout`);

    return res.data;
  } catch (error) {
    return handleError(error);
  }
}
