
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

export async function getPatientAppointments(): Promise<{
  appointments: Appointment[];
  pagination: Pagination;
}> {
  try {
    const res = await api.get("/patients/appointments");
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function bookPatientAppointments(data: {
  doctor_id: string;
  schedule_id: number;
  appointment_date: string;
  appointment_time: string;
  notes: string;
}) {
  try {
    const res = await api.post("/patients/appointments/book", data);
    return res.data;
  } catch (error) {
    return handleError(error);
  }
}
