
import { ChangePasswordProps, ForgotPasswordProps, LoginProps, RegisterProps, ResetPasswordProps, UpdateUserProps, User } from "@/types";
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

export async function forgotPassword(data: ForgotPasswordProps): Promise<{ message: string }> {
  try {
    const res = await api.post('/auth/forgot-password', data);
    return res.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function resetPassword(data: ResetPasswordProps): Promise<{ message: string }> {
  try {
    const res = await api.patch(`/auth/reset-password/${data.token}`, {
      password: data.password,
      confirm_password: data.confirm_password
    });
    return res.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getMe(): Promise<User> {
  try {
    const res = await api.get('/auth/me');
    return res.data.data.user;
  } catch (error) {
    return handleError(error);
  }
}

export async function updateMe(data: UpdateUserProps): Promise<User> {
  try {
    const res = await api.patch('/auth/update-me', data);
    return res.data.data.user;
  } catch (error) {
    return handleError(error);
  }
}

export async function changePassword(data: ChangePasswordProps): Promise<{ message: string }> {
  try {
    const res = await api.patch('/auth/change-password', data);
    return res.data;
  } catch (error) {
    return handleError(error);
  }
}
