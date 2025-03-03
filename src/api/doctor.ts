/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Appointment,
  Doctor,
  Pagination,
  Patient,
  PrescriptionProps,
  Report,
  ScheduleProps,
  UpdateDoctorProps,
} from "@/types";
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

export async function getDoctors(queryParams?: Record<string, any>): Promise<{
  doctors: Doctor[];
  pagination: Pagination;
}> {
  try {
    const params = new URLSearchParams();
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        params.append(key, value);
      });
    }

    const res = await api.get(`/doctors?${params.toString()}`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getDoctorById(id: number | string): Promise<Doctor> {
  try {
    const res = await api.get(`/doctors/${id}`);
    return res.data.data.doctor;
  } catch (error) {
    return handleError(error);
  }
}

export async function updateDoctor(
  id: number | string,
  data: UpdateDoctorProps
): Promise<Doctor> {
  try {
    const res = await api.patch(`/doctors/${id}`, data);
    return res.data.data.doctor;
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteDoctor(
  id: number | string
): Promise<{ message: string }> {
  try {
    const res = await api.delete(`/doctors/${id}`);
    return res.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getDoctorSchedule(
  queryParams?: Record<string, any>
): Promise<{
  schedules: ScheduleProps[];
  pagination: Pagination;
}> {
  try {
    const params = new URLSearchParams();
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        params.append(key, value);
      });
    }

    const res = await api.get(`/doctors/schedule?${params.toString()}`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function setDoctorSchedule(
  data: ScheduleProps
): Promise<{ message: string }> {
  try {
    const res = await api.post("/doctors/set-schedule", data);
    return res.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getDoctorAppointments(
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

    const res = await api.get(`/doctors/appointments?${params.toString()}`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function createPrescription(
  data: PrescriptionProps
): Promise<Report> {
  try {
    const res = await api.post("/doctors/prescription", data);
    return res.data.data.prescription;
  } catch (error) {
    return handleError(error);
  }
}

export async function getDoctorPatients(
  queryParams?: Record<string, any>
): Promise<{
  patients: Patient[];
  pagination: Pagination;
}> {
  try {
    const params = new URLSearchParams();
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        params.append(key, value);
      });
    }

    const res = await api.get(`/doctors/patients?${params.toString()}`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
}
