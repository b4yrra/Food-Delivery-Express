import { User } from "../types";

type GetUsers = {
  users: User[];
};

export const getUsers = async () => {
  const res = await fetch("http://localhost:3000/users");
  if (!res.ok) return [];
  return res.json();
};
