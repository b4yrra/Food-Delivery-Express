import { User } from "../types";

export const getUsers = async (): Promise<User[]> => {
  try {
    const res = await fetch("/api/user");
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data.users ?? []);
  } catch (err) {
    console.error("getUsers error:", err);
    return [];
  }
};
