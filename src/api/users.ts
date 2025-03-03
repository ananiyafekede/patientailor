
import { Pagination, UpdateUserProps, User } from "@/types";
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

export async function getUsers(queryParams?: Record<string, any>): Promise<{
  users: User[];
  pagination: Pagination;
}> {
  try {
    const params = new URLSearchParams();
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        params.append(key, value);
      });
    }
    
    const res = await api.get(`/users?${params.toString()}`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getUserById(id: number | string): Promise<User> {
  try {
    const res = await api.get(`/users/${id}`);
    return res.data.data.user;
  } catch (error) {
    return handleError(error);
  }
}

export async function updateUser(id: number | string, data: UpdateUserProps): Promise<User> {
  try {
    const res = await api.patch(`/users/${id}`, data);
    return res.data.data.user;
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteUser(id: number | string): Promise<{ message: string }> {
  try {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function deactivateUser(id: number | string): Promise<{ message: string }> {
  try {
    const res = await api.patch(`/users/deactivate/${id}`);
    return res.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function activateUser(id: number | string): Promise<{ message: string }> {
  try {
    const res = await api.patch(`/users/activate/${id}`);
    return res.data;
  } catch (error) {
    return handleError(error);
  }
}
