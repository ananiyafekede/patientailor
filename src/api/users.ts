import axios from "axios";

export async function getUsers() {
  const res = await axios.get(`http://localhost:3000/users`);

  return res.data;
}
