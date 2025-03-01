import { Appointment, Doctor, Pagination, Schedule } from "@/types";
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

export async function getScheduleForDoctor(doctorId: string | number): Promise<{
  schedules: Schedule[];
  pagination: Pagination;
}> {
  try {
    const res = await api.get(`/doctors/${doctorId}/schedule`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
}
