import axios from "axios";

export async function getDoctorDetail(id: string) {
  const res = await axios.get(`http://localhost:3000/doctors?id=${id}`);

  return res.data;
}
