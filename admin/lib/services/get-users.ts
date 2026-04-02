import { User } from "../types";

export const getUsers = async (): Promise<User[]> => {
  const res = await fetch("/api/users");
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : (data.users ?? []);
};
