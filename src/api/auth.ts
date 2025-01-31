import { LoginRequest, User } from "@/types";
import axios from "axios";

export async function login(data: LoginRequest): Promise<User> {
  const res = await axios.get(
    `http://localhost:3000/users?email=${data.email}&password_hash=${data.password_hash}`
  );
  if (res.data.length) {
    return res.data[0];
  } else {
    throw Error("invalid Credentials");
  }
}
export async function logout(): Promise<User> {
  const res = await axios.get(`http://localhost:3000/users`);
  if (res.data.length) {
    return;
  } else {
    throw Error("invalid Credentials");
  }
}
