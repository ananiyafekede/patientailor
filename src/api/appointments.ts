import { Appointment, Pagination } from "@/types";
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

export async function getAppointments(): Promise<{
  appointments: Appointment[];
  pagination: Pagination;
}> {
  try {
    const res = await api.get("/appointments");
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
}
