import axios from "axios";

export async function getNotifications() {
  const res = await axios.get(`http://localhost:3000/notifications`);
  console.log("====================================");
  console.log(res.data);
  console.log("====================================");
  return res.data;
}
