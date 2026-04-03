import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
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
      return NextResponse.json([]);
    }

    const data = await res.json();

    return NextResponse.json(Array.isArray(data) ? data : (data.users ?? []));
  } catch (err) {
    console.error("GET /api/user error:", err);
    return NextResponse.json([]);
  }
}
