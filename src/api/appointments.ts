/* eslint-disable @typescript-eslint/no-explicit-any */
import { Appointment, AppointmentStatusProps, Pagination } from "@/types";
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

export async function getAppointments(
  queryParams?: Record<string, any>
): Promise<{
  appointments: Appointment[];
  pagination: Pagination;
}> {
  try {
    const params = new URLSearchParams();
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        params.append(key, value);
      });
    }

    const res = await api.get(`/appointments?${params.toString()}`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getAppointmentById(
  id: number | string
): Promise<Appointment> {
  try {
    const res = await api.get(`/appointments/${id}`);
    return res.data.data.appointment;
  } catch (error) {
    return handleError(error);
  }
}

export async function bookAppointment(data: {
  doctor_id: string | number;
  schedule_id: number;
  appointment_date: string;
  appointment_time: string;
  notes?: string;
}): Promise<Appointment> {
  try {
    const res = await api.post("/appointments/book", data);
    return res.data.data.appointment;
  } catch (error) {
    return handleError(error);
  }
}

export async function rescheduleAppointment(
  id: number | string,
  data: {
    appointment_date: string;
    appointment_time: string;
  }
): Promise<Appointment> {
  try {
    const res = await api.patch(`/appointments/${id}/reschedule`, data);
    return res.data.data.appointment;
  } catch (error) {
    return handleError(error);
  }
}

export async function cancelAppointment(
  id: number | string
): Promise<{ message: string }> {
  try {
    const res = await api.delete(`/appointments/${id}/cancel`);
    return res.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function updateAppointmentStatus(
  id: number | string,
  status: string
): Promise<Appointment> {
  try {
    const res = await api.patch(`/appointments/${id}/status`, { status });
    return res.data.data.appointment;
  } catch (error) {
    return handleError(error);
  }
}
