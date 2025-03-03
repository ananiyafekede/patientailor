export interface User {
  id: number;
  username: string;
  password_hash: string;
  role: "admin" | "doctor" | "patient";
  email: string;
  avatar: string | undefined;
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
  first_name: string;
  last_name: string;
  date_of_birth?: string | null;
  address?: string | null;
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
  patient: Patient;
  Doctor: Doctor;
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
  created_at?: string;
}

export interface Notification {
  id: number;
  user_id: number;
  message: string;
  is_read: boolean;
  created_at?: string;
}

export interface Report {
  created_by?: number | null;
  created_at?: string;
  id?: number;
  type?: "prescription" | "diagnosis" | "treatment" | "lab-test";
  content: object;
  author_id?: number;
  patient_id: number;
}

export interface Billing {
  id: number;
  appointment_id: number;
  payment_status: "pending" | "paid";
  payment_method?: string | null;
  payment_date?: string | null;
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

export interface LoginProps {
  email: string;
  password_hash: string;
}

export interface RegisterProps {
  id?: number;
  username: string;
  password_hash: string;
  password_hash_confirm: string | undefined;
  role: "admin" | "doctor" | "patient";
  email: string;
  avatar: string | undefined;
  phone_number?: string;
}

export interface Pagination {
  total: number;
  limit: number;
  page: number;
  totalPages: number;
}

// New types for API endpoints

export interface UpdateUserProps {
  username?: string;
  email?: string;
  phone_number?: string;
  avatar?: string;
}

export interface UpdatePatientProps extends UpdateUserProps {
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  address?: string;
}

export interface UpdateDoctorProps extends UpdateUserProps {
  first_name?: string;
  last_name?: string;
  specialty?: string;
  qualification?: string;
  experience_years?: number;
  address?: string;
}

export interface ChangePasswordProps {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export interface ForgotPasswordProps {
  email: string;
}

export interface ResetPasswordProps {
  password: string;
  confirm_password: string;
  token: string;
}

export interface BookAppointmentProps {
  doctor_id: string | number;
  schedule_id: number;
  appointment_date: string;
  appointment_time: string;
  notes?: string;
}

export interface ScheduleProps {
  schedule_date: string;
  start_time: string;
  end_time: string;
}

export interface FeedbackProps {
  feedback_text: string;
}

export interface NotificationProps {
  user_id: number;
  message: string;
}

export interface PrescriptionProps {
  appointment_id: number;
  patient_id: number;
  diagnosis: string;
  medication: string;
  dosage: string;
  instructions: string;
}

export interface AppointmentStatusProps {
  status: "pending" | "completed" | "canceled";
}
