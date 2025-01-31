export interface User {
  id: number;
  username: string;
  password_hash: string;
  role: "admin" | "doctor" | "patient";
  email: string;
  phone_number?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Patient {
  user_id: number;
  first_name: string;
  last_name: string;
  date_of_birth?: string | null;
  address?: string | null;
}

export interface Doctor {
  user_id: number;
  specialty?: string | null;
  qualification?: string | null;
  experience_years?: number | null;
}

export interface Schedule {
  id: number;
  doctor_id: number;
  schedule_date: string;
  start_time: string;
  end_time: string;
}

export interface Appointment {
  id: number;
  patient_id: number;
  doctor_id: number;
  schedule_id?: number | null;
  appointment_date: string;
  appointment_time: string;
  status: "pending" | "completed" | "canceled";
  notes?: string | null;
}

export interface Feedback {
  id: number;
  patient_id: number;
  feedback_text: string;
}

export interface Notification {
  id: number;
  user_id: number;
  message: string;
  is_read: boolean;
}

export interface Report {
  id: number;
  report_type: string;
  report_content: object;
  created_by?: number | null;
}

export interface Billing {
  id: number;
  appointment_id: number;
  payment_status: "pending" | "paid";
  payment_method?: string | null;
  amount: number;
}

export interface ActivityLog {
  id: number;
  user_id: number;
  activity_type: string;
  activity_details?: string | null;
}

export interface BackupLog {
  id: number;
  backup_date: string;
  status: "success" | "failure";
  details?: string | null;
}

// REQ TYPE

export interface LoginRequest {
  email: string;
  password_hash: string;
}
