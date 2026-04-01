import { User } from "../types";

type GetUsers = {
  users: User[];
};

export const getUsers = async (): Promise<User[]> => {
  const res = await fetch("http://localhost:3000/users");
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : (data.users ?? []);
};
