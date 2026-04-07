import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const credentials = await request.json();
  const cookieStore = await cookies();

  const response = await fetch(
    "https://food-delivery-express.onrender.com/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    return NextResponse.json(
      { message: error.message ?? "Invalid credentials" },
      { status: response.status },
    );
  }

  const data = await response.json();
  cookieStore.set("token", data.secretToken);

  // Fetch user profile to get role
  const meRes = await fetch(
    "https://food-delivery-express.onrender.com/auth/me",
    {
      headers: { Authorization: `Bearer ${data.secretToken}` },
    },
  );

  const user = meRes.ok ? await meRes.json() : null;

  return NextResponse.json({ success: true, role: user?.role ?? "user" });
}
