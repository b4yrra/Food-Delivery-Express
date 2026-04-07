import { cookies } from "next/headers";
import { User } from "../types";

export const getUsers = async (): Promise<User[]> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(
      "https://food-delivery-express.onrender.com/users",
      {
        headers: {
          Authorization: `Bearer ${token ?? ""}`,
        },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      console.error("Users fetch failed:", res.status);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : (data.users ?? []);
  } catch (err) {
    console.error("getUsers error:", err);
    return [];
  }
};
