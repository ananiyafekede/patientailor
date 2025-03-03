
// Re-export admin-specific hooks for convenience
import { 
  useGetUsers, 
  useGetUserById, 
  useUpdateUser, 
  useDeleteUser, 
  useDeactivateUser, 
  useActivateUser 
} from './users';

import { useGetReports, useGetReportById, useDeleteReport } from './report';
import { useGetFeedback, useDeleteFeedback } from './feedback';
import { useGetAppointments } from './appointment';

export {
  // User management hooks
  useGetUsers,
  useGetUserById,
  useUpdateUser,
  useDeleteUser,
  useDeactivateUser,
  useActivateUser,
  
  // Report hooks
  useGetReports,
  useGetReportById,
  useDeleteReport,
  
  // Feedback hooks
  useGetFeedback,
  useDeleteFeedback,
  
  // Appointment hooks
  useGetAppointments
};
