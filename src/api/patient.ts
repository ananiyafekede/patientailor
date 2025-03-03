
import { Appointment, Pagination, Patient, Report, UpdatePatientProps } from "@/types";
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

export async function getPatients(queryParams?: Record<string, any>): Promise<{
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
    
    const res = await api.get(`/patients?${params.toString()}`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getPatientById(id: number | string): Promise<Patient> {
  try {
    const res = await api.get(`/patients/${id}`);
    return res.data.data.patient;
  } catch (error) {
    return handleError(error);
  }
}

export async function updatePatient(id: number | string, data: UpdatePatientProps): Promise<Patient> {
  try {
    const res = await api.patch(`/patients/${id}`, data);
    return res.data.data.patient;
  } catch (error) {
    return handleError(error);
  }
}

export async function deletePatient(id: number | string): Promise<{ message: string }> {
  try {
    const res = await api.delete(`/patients/${id}`);
    return res.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getPatientAppointments(
  id?: number | string,
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
    
    const endpoint = id ? `/patients/${id}/appointments` : '/patients/appointments';
    const res = await api.get(`${endpoint}?${params.toString()}`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getPatientReports(
  id?: number | string,
  queryParams?: Record<string, any>
): Promise<{
  reports: Report[];
  pagination: Pagination;
}> {
  try {
    const params = new URLSearchParams();
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        params.append(key, value);
      });
    }
    
    const endpoint = id ? `/patients/${id}/reports` : '/patients/reports';
    const res = await api.get(`${endpoint}?${params.toString()}`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function uploadMedicalRecords(formData: FormData): Promise<{ message: string }> {
  try {
    const res = await api.post('/patients/upload-records', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function bookPatientAppointment(data: {
  doctor_id: string | number;
  schedule_id: number;
  appointment_date: string;
  appointment_time: string;
  notes?: string;
}): Promise<Appointment> {
  try {
    const res = await api.post("/patients/appointments/book", data);
    return res.data.data.appointment;
  } catch (error) {
    return handleError(error);
  }
}
