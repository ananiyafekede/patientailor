
import { Feedback, FeedbackProps, Pagination } from "@/types";
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

export async function getFeedback(queryParams?: Record<string, any>): Promise<{
  feedback: Feedback[];
  pagination: Pagination;
}> {
  try {
    const params = new URLSearchParams();
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        params.append(key, value);
      });
    }
    
    const res = await api.get(`/feedback?${params.toString()}`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function submitFeedback(data: FeedbackProps): Promise<Feedback> {
  try {
    const res = await api.post('/feedback', data);
    return res.data.data.feedback;
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteFeedback(id: number | string): Promise<{ message: string }> {
  try {
    const res = await api.delete(`/feedback/${id}`);
    return res.data;
  } catch (error) {
    return handleError(error);
  }
}
