import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch("http://localhost:3000/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return NextResponse.json([]);
  const data = await res.json();
  return NextResponse.json(data);
}
