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

  const payloadBase64 = data.secretToken.split(".")[1];
  const payload = JSON.parse(Buffer.from(payloadBase64, "base64").toString());
  const role = payload?.data?.role ?? "User";

  return NextResponse.json({ success: true, role });
}
