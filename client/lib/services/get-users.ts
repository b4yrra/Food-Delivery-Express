import { User } from "../types";

type GetUsers = {
  users: User[];
};

export const getUsers = async () => {
  const response = await fetch("http://localhost:3000/users");
  const data: GetUsers = await response.json();

  return data.users;
};
