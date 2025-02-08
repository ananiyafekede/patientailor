import axios from "axios";

export async function getDoctorAppointments(id: string) {
  const res = await axios.get(
    `http://localhost:3000/appointments?doctor_id=${id}`
  );

  const user = await axios.get(
    `http://localhost:3000/patients?patient_id=${res.data[0].patient_id}`
  );

  return [{ ...res.data[0], ...user.data[0] }];
}
