
import { Pagination, Report } from "@/types";
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

export async function getReports(queryParams?: Record<string, any>): Promise<{
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
    
    const res = await api.get(`/reports?${params.toString()}`);
    return res.data.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getReportById(id: number | string): Promise<Report> {
  try {
    const res = await api.get(`/reports/${id}`);
    return res.data.data.report;
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteReport(id: number | string): Promise<{ message: string }> {
  try {
    const res = await api.delete(`/reports/${id}`);
    return res.data;
  } catch (error) {
    return handleError(error);
  }
}
