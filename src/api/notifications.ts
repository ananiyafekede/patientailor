
import { Notification, NotificationProps, Pagination } from "@/types";
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

export async function getNotifications(queryParams?: Record<string, any>): Promise<{
  notifications: Notification[];
  pagination: Pagination;
}> {
  try {
    const params = new URLSearchParams();
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        params.append(key, value);
      });
    }
    
    const res = await api.get(`/notifications?${params.toString()}`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function sendNotification(data: NotificationProps): Promise<Notification> {
  try {
    const res = await api.post('/notifications', data);
    return res.data.data.notification;
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteNotification(id: number | string): Promise<{ message: string }> {
  try {
    const res = await api.delete(`/notifications/${id}`);
    return res.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function markNotificationsAsRead(): Promise<{ message: string }> {
  try {
    const res = await api.delete('/notifications/read');
    return res.data;
  } catch (error) {
    return handleError(error);
  }
}
