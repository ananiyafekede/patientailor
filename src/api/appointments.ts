import axios from "axios";

export async function getAppointments() {
  const appointments = await axios.get(`http://localhost:3000/appointments`);
  const patient = await axios.get(
    `http://localhost:3000/patients?user_id=${appointments.data[0].patient_id}`
  );
  const doctor = await axios.get(
    `http://localhost:3000/doctors?user_id=${appointments.data[0].doctor_id}`
  );
  const schedules = await axios.get(
    `http://localhost:3000/schedules?doctor_id=${appointments.data[0].doctor_id}`
  );

  console.log(appointments.data);
  console.log(patient.data);
  console.log(doctor.data);
  const data = {
    ...appointments.data[0],
    ...patient.data[0],
    ...doctor.data[0],
    ...schedules.data[0],
  };

  console.log([data]);

  return [data];
}
